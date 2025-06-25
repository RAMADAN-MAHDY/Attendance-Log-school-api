import express from 'express';
import { markClassPresent } from '../helpers/markClassPresent.js';
const router = express.Router();

router.post('/', async (req, res) => {
  const { grade, classRoom } = req.body;

  if (!grade || !classRoom) {
    return res.status(400).json({ message: "الصف والفصل مطلوبين" });
  }

  try {
    await markClassPresent(grade, classRoom);
    return res.status(200).json({ message: "تم تسجيل الحضور لهذا الفصل" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "حدث خطأ أثناء تسجيل الحضور" });
  }
});

export default router;
