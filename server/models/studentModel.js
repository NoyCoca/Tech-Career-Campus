const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        phone: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        courseName: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: "Student",
        },
        profileImg: {
          type: String,
          default: "",
        },
        IdNumber: {
          type: String,
          default: "",
        },
        tests: {
          type: [
            {
              name: {
                type: String,
                require: true,
              },
              grade: {
                type: Number,
                required: true,
              },
            },
          ],
        },
    required:false,
    messages: [{ type: Schema.Types.ObjectId, ref: "forum" }],
    courseId: { type: Schema.Types.ObjectId, ref: "course" },
    createBy: { type: Schema.Types.ObjectId, ref: "staff" },
  },
  { timestamps: true }
);

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
