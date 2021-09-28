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
        },
        profileImg: {
          type: String,
        },
        IdNumber: {
          type: String,
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
    courseId: { type: Schema.Types.ObjectId, ref: "course" }
    
  },
  { timestamps: true }
);


const Student = mongoose.model("student", studentSchema);
module.exports = Student;
