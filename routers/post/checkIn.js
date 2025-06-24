import express from 'express';
import StateSchema from '../../schema/state.js';

const checkInRouter = express.Router();

checkInRouter.post('checkIn/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const status = "Present";
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1);

        if (!id) {
            return res.status(400).json("خطأ في الـ ID");
        }

        const existingRecord = await StateSchema.findOne({
            user: id,
            checkIn: { $gte: startOfDay, $lt: endOfDay }
        });

        if (existingRecord) {
            return res.status(400).json("تم تسجيل الحضور بالفعل اليوم، لا يمكن تسجيله مرة أخرى");
        }

        await StateSchema.create({
            status,
            user: id,
            checkIn: now,
        });

        return res.status(201).json("تم تسجيل الحضور بنجاح");

    } catch (err) {
        console.error(err);
        return res.status(500).json("خطأ في التسجيل");
    }
});

export default checkInRouter;
