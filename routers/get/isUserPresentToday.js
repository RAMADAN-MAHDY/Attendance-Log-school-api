import express from 'express';
import StateSchema from '../../schema/state.js';

const router_IsUserPresentToday = express.Router();

router_IsUserPresentToday.get('/', async (req, res) => {
    try {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        // جلب جميع المستخدمين مع حالة الحضور
        const records = await StateSchema.find({
            checkIn: { $gte: startOfDay, $lt: endOfDay }
        }).populate('user', 'names');

        const usersWithAttendance = records.map(record => ({
            userId: record.user._id,
            userName: record.user.names,
            status: record.status
        }));
       
        return res.status(200).json({ usersWithAttendance });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "حدث خطأ أثناء جلب حالة الحضور" });
    }
});

export default router_IsUserPresentToday;