import express from "express";
import Students from "../../schema/regstur.js";
import GraduatedStudents from "../../schema/GraduatedStudents.js";
import StateSchema from "../../schema/state.js";

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

    const students = await Students.find();

    let promotedCount = 0;
    let graduatedCount = 0;
    let excludedCount = 0;

    const updatePromises = [];  // لتخزين العمليات المتوازية

    for (const student of students) {
      if (excludedCodes.includes(student.code)) {
        excludedCount++;
        continue;
      }

      const currentIndex = grades.indexOf(student.grade);

      if (currentIndex === grades.length - 1) {
        
        await GraduatedStudents.deleteMany({});

        // إضافة الطالب إلى المتخرجين باستخدام العملية المتوازية
        updatePromises.push(
          GraduatedStudents.create({
            ...student.toObject(),
            graduationDate: new Date(),
          }).then(() => {
            graduatedCount++;
          })
        );

        // لا يتم حذف الطالب هنا
      } else {
        const newGrade = grades[currentIndex + 1];

        // تحديث الصف الجديد باستخدام العملية المتوازية
        updatePromises.push(
          Students.updateOne(
            { _id: student._id },
            { $set: { grade: newGrade } }
          ).then(() => {
            promotedCount++;
          })
        );
        // حذف بيانات الحضور والغياب باستخدام العملية المتوازية
        updatePromises.push(
          StateSchema.deleteMany({ user: student._id }).then(() => {
            // يمكن إضافة أي معالجة إضافية هنا لو لزم الأمر
          })
        );
      }
    }

    // انتظر حتى تكتمل جميع العمليات
    await Promise.all(updatePromises);

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
