import Students from '../../schema/regstur.js';
import StateSchema from '../../schema/state.js';

const markClassPresent = async (grade, classRoom) => {
  try {
    const students = await Students.find({ grade, classRoom });
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const existingRecords = await StateSchema.find({
      date: startOfDay,
      user: { $in: students.map(s => s._id) }
    });
    
    const existingUserIds = existingRecords.map(record => record.user.toString());

    const newRecords = students
      .filter(student => !existingUserIds.includes(student._id.toString()))
      .map(student => ({
        user: student._id,
        status: "Present",
        date: startOfDay,
        checkIn: now
      }));

    if (newRecords.length > 0) {
      await StateSchema.insertMany(newRecords);
      console.log(`✔️ تم تسجيل حضور ${newRecords.length} طالب في ${grade} - ${classRoom}`);
    } else {
      console.log(`⚠️ جميع الطلاب في ${grade} - ${classRoom} مسجلين بالفعل`);
    }
  } catch (err) {
    console.error("❌ حصل خطأ أثناء تسجيل الحضور:", err);
  }
};

export { markClassPresent };
