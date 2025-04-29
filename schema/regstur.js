import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    classRoom: {
        type: String,
        required: true,
    }
});

const Students = mongoose.model('Students', userSchema);
export default Students;
