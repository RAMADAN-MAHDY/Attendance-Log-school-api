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

    const studentUpdates = [];
    const stateDeletes = [];

    for (const student of students) {
      if (excludedCodes.includes(student.code)) {
        excludedCount++;
        continue;
      }

      const currentIndex = grades.indexOf(student.grade);

      if (currentIndex === grades.length - 1) {
        // إضافة الطالب إلى المتخرجين
        studentUpdates.push({
          insertOne: {
            document: {
              ...student.toObject(),
              graduationDate: new Date(),
            },
          },
        });

        // لا يتم حذف الطالب من الطلاب
      } else {
        const newGrade = grades[currentIndex + 1];

        // تحديث الصف الجديد للطالب
        studentUpdates.push({
          updateOne: {
            filter: { _id: student._id },
            update: { $set: { grade: newGrade } },
          },
        });

        // حذف بيانات الحضور والغياب
        stateDeletes.push({
          deleteMany: {
            filter: { user: student._id },
          },
        });
      }
    }

    // إجراء جميع التحديثات والحذف دفعة واحدة باستخدام bulkWrite
    if (studentUpdates.length > 0) {
      await Students.bulkWrite(studentUpdates);
    }

    if (stateDeletes.length > 0) {
      await StateSchema.bulkWrite(stateDeletes);
    }

    // إضافة الطلاب المتخرجين دفعة واحدة
    if (graduatedCount > 0) {
      await GraduatedStudents.bulkWrite(studentUpdates.filter(update => update.insertOne));
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
