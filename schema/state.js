import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students',
        required: true
    },
    checkIn: {
        type: Date,
        default: null
    },
    checkOut: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const StateSchema = mongoose.model('State', stateSchema);
export default StateSchema;
