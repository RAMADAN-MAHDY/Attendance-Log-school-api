import express from 'express';
import StateSchema from '../../schema/state.js';

const router_IsUserPresentToday = express.Router();

router_IsUserPresentToday.get('/', async (req, res) => {
    try {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        console.log(`Querying records from ${startOfDay} to ${endOfDay}`);

        const records = await StateSchema.find({
            checkIn: { $gte: startOfDay, $lt: endOfDay }
        }).populate('user', 'names');

        if (!records || records.length === 0) {
            console.log('No attendance records found for the specified date range.');
        }

        const usersWithAttendance = records.map(record => ({
            userId: record.user?._id || null,
            userName: record.user?.names || 'Unknown',
            status: record.status
        }));

        return res.status(200).json({ usersWithAttendance });
    } catch (err) {
        console.error('Error fetching attendance records:', err.message);
        return res.status(500).json({ message: "حدث خطأ أثناء جلب حالة الحضور", error: err.message });
    }
});

router_IsUserPresentToday.put('/update/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        console.log(status)
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // التأكد من وجود سجل بنفس اليوم
        let record = await StateSchema.findOne({
            user: id,
            date: startOfDay
        }).populate('user', 'names');

        if (record) {
            record.status = status;
            if (status === "Present") {
                record.checkIn = now;
            } else {
                record.checkIn = null;
            }
            await record.save();
        } else {
            record = await StateSchema.create({
                user: id,
                status,
                date: startOfDay,
                checkIn: status === "Present" ? now : null
            });
        }

        return res.status(200).json({
            userId: record.user?._id || null,
            userName: record.user?.names || 'غير معروف',
            status: record.status
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'حدث خطأ أثناء التحديث' });
    }
});












export default router_IsUserPresentToday;