// models/GraduatedStudents.js
import mongoose from "mongoose";

const graduatedSchema = new mongoose.Schema({
  names: String,
  password: String,
  code: Number,
  phone: Number,
  grade: String,
  classRoom: String,
  graduationDate: Date,
});

const GraduatedStudents =
  mongoose.models.GraduatedStudents ||
  mongoose.model("GraduatedStudents", graduatedSchema);

export default GraduatedStudents;
