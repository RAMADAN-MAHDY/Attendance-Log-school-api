import express from 'express';
import StateSchema from '../../schema/state.js';

const cancelCheckIn = () => {
    const app = express();
    app.use(express.json());

    app.delete('/cancelCheckIn/:id', async (req, res) => {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json("خطأ في الـ ID");
            }

            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(startOfDay);
            endOfDay.setDate(startOfDay.getDate() + 1);

            // البحث عن سجل الحضور في نفس اليوم
            const deleted = await StateSchema.findOneAndDelete({
                user: id,
                checkIn: { $gte: startOfDay, $lt: endOfDay }
            });

            if (!deleted) {
                return res.status(404).json("لا يوجد حضور لهذا الطالب اليوم لإلغائه");
            }
            console.log({ success: true, message: "تم تسجيل الغياب بنجاح" });
            res.json({ success: true, message: "تم تسجيل الغياب بنجاح" });

        } catch (err) {
            console.error(err);
            return res.status(500).json("حدث خطأ أثناء الإلغاء");
        }
    });

    return app;
}

export default cancelCheckIn;
