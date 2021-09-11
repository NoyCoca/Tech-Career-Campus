const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
      
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: false,
      default: 0,
    },
    role: {
      type: String,
      default: "Staff",
    },
    profileImg: {
      type: String,
      default: "",
    },
    IdNumber: {
      type: String,
      default: "",
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "course"}],
    events: [{ type: Schema.Types.ObjectId, ref: "event" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "forum" }],
    students: [{ type: Schema.Types.ObjectId, ref: "student"}]
  },
  { timestamps: true }
);
const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;


