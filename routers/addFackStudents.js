import Students from '../schema/regstur.js'; // عدّل المسار حسب مكان الملف
export const grades = [
    {
      grade: "الصف الأول",
      classes: ["فصل 1", "فصل 2", "فصل 3"]
    },
    {
      grade: "الصف الثاني",
      classes: ["فصل 1", "فصل 2", "فصل 3"]
    },
    {
      grade: "الصف الثالث",
      classes: ["فصل 1", "فصل 2", "فصل 3"]
    },
    {
      grade: "الصف الرابع",
      classes: ["فصل 1", "فصل 2", "فصل 3"]
    },
    {
      grade: "الصف الخامس",
      classes: ["فصل 1", "فصل 2", "فصل 3"]
    },
    {
      grade: "الصف السادس",
      classes: ["فصل 1", "فصل 2", "فصل 3"]
    }
  ];   // عدّل المسار حسب مكان الملف


  const generateRandomName = () => {
    const firstNames = ["محمد", "أحمد", "خالد", "يوسف", "محمود"];
    const middleNames = ["علي", "سعيد", "حسن", "جمال", "إبراهيم"];
    const lastNames = ["الشيخ", "عبدالله", "النجار", "السيد", "مصطفى"];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ` +
           `${middleNames[Math.floor(Math.random() * middleNames.length)]} ` +
           `${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };
  
  const generateRandomPhone = () => {
    return "010" + Math.floor(10000000 + Math.random() * 90000000);
  };
  
  const addStudentsSmart = async () => {
    try {
      // 1. نجيب أكبر كود حالي موجود
      const lastStudent = await Students.findOne().sort({ code: -1 });
      let globalCode = lastStudent ? lastStudent.code + 1 : 1000;
  
      for (const grade of grades) {
        for (const classRoom of grade.classes) {
          const existingStudents = await Students.find({
            grade: grade.grade,
            classRoom: classRoom,
          });
  
          const missing = 40 - existingStudents.length;
          if (missing <= 0) continue;
  
          const newStudents = [];
  
          for (let i = 0; i < missing; i++) {
            newStudents.push({
              names: generateRandomName(),
              password: "123456",
              code: globalCode++,
              phone: Number(generateRandomPhone()),
              grade: grade.grade,
              classRoom: classRoom,
            });
          }
  
          await Students.insertMany(newStudents);
          console.log(`✔️ أُضيف ${missing} طالب في ${grade.grade} - ${classRoom}`);
        }
      }
  
      console.log("✅ تم إضافة الطلاب للفصول الناقصة فقط، والكود فريد");
    } catch (error) {
      console.error("❌ حصل خطأ أثناء الإضافة:", error);
    }
  };
  
export {addStudentsSmart};