import express from 'express';
import Students from '../../schema/regstur.js';

const router_Users = express.Router();

router_Users.get('/', async (req, res) => {
    try {
        const { grade, classRoom } = req.query;  // نأخذ السنة والفصل من query parameter

        let filter = {};
        if (grade) {
            filter.grade = grade;  // إذا كانت السنة موجودة في الـ query نضيفها للـ filter
        }
        if (classRoom) {
            filter.classRoom = classRoom;  // إذا كان الفصل موجودًا في الـ query نضيفه للـ filter
        }

        // استبعاد حقل الباسورد
        const getUser = await Students.find(filter).select('-password').lean();
        if (!getUser || getUser.length === 0) {
            return res.status(404).json({ message: "Record Not Found" });
        }
        return res.status(200).json({ getUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "خطأ في جلب البيانات" });
    }
});


export default router_Users;