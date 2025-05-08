import express from "express";
import Students from "../../schema/regstur.js";
import GraduatedStudents from "../../schema/GraduatedStudents.js";
import StateSchema from "../../schema/state.js"
const gradePromotionRouter = express.Router();

const grades = [
  "الصف الأول",
  "الصف الثاني",
  "الصف الثالث",
  "الصف الرابع",
  "الصف الخامس",
  "الصف السادس",
];

gradePromotionRouter.post("/", async (req, res) => {
  try {
    const { excludedCodes = [] } = req.body;


    // if (password !== correctPassword) {
    //     return res.status(403).json({ error: "كلمة المرور غير صحيحة" });
    //   }

    const students = await Students.find();

    let promotedCount = 0;
    let graduatedCount = 0;
    let excludedCount = 0;

    for (const student of students) {
      if (excludedCodes.includes(student.code)) {
        excludedCount++;
        continue;
      }

      const currentIndex = grades.indexOf(student.grade);

      if (currentIndex === grades.length - 1) {
        await GraduatedStudents.create({
          ...student.toObject(),
          graduationDate: new Date(),
        });

        await Students.deleteOne({ _id: student._id });
        graduatedCount++;
        
      } else {
        const newGrade = grades[currentIndex + 1];
        await Students.updateOne(
          { _id: student._id },
          { $set: { grade: newGrade } }
        );

        // إعادة تعيين بيانات الحضور والغياب للسنة الجديدة

        StateSchema.deleteMany({ user: student._id })
        promotedCount++;
      }
    }

    res.json({
      message: "تم الترحيل بنجاح",
      stats: {
        promoted: promotedCount,
        graduated: graduatedCount,
        excluded: excludedCount,
      },
    });
  } catch (err) {
    console.error("خطأ:", err);
    res.status(500).json({ error: "حدث خطأ أثناء الترحيل" });
  }
});

export default gradePromotionRouter;
