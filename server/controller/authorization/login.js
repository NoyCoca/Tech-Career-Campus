const StaffModel = require("../../models/staffModel");
const StudentModel = require("../../models/studentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateLoginInput = require("./loginValidator");
const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  if (req.body.role === "Staff") {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) { 
      return res
        .status(400)
        .json({
          success: false,
          message: "there is error with email or password.",
          error: errors
        });
    };

    const { email, password } = req.body;
    try {
      const staff = await StaffModel.findOne({ email });
      if (!staff) {
        return res
          .status(400)
          .json({
            success: false,
            message: "email not found",
            errors: { email: "email not fond" },
          });
      };

      const isPasswordCorrect = await bcrypt.compare(password, staff.password);
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({
            success: false,
            message: "wrong password",
            errors: { password: "wrong password" } ,
          });
      };

      delete staff.password
      const token = jwt.sign(staff.toJSON(), SECRET_KEY, { expiresIn: "1d" });
      res
        .status(200)
        .json({
          success: true,
          message: "success",
          data: token
        });

    } catch (err) {
      res
        .status(500)
        .json({
          message: "something went wrong",
          error: err.message
        });
    }
  }

  if (req.body.role === "Student") {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res
        .status(400)
        .json({
          message: "there is error with email or password.",
          error: errors
        })
    };

    const { email, password } = req.body;
    try {
      const student = await StudentModel.findOne({ email });
      if (!student) {
        return res
          .status(400)
          .json({
            success: false,
            message: "email not fond",
            errors: { email: "email not fond" },
          });
      };

      const isPasswordCorrect = await bcrypt.compare(password, student.password);

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({
            success: false,
            message: "wrong password",
            errors: { password: "wrong password" } ,
          });
      };

      delete student.password
      const token = jwt.sign(student.toJSON(), SECRET_KEY, { expiresIn: "1d" });
      res
        .status(200)
        .json({
          message: "success",
          data: token
        });

    } catch (err) {
      res
        .status(500)
        .json({
          message: "something went wrong",
          error: err.message
        });
    }
  }
};

module.exports = login;
