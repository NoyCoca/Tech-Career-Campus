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
        .status(404)
        .json({ message: "there is error with email or password.", errors });
    };

    const { email, password } = req.body;
    try {
      const staff = await StaffModel.findOne({ email });
      if (!staff) {
        return res.status(400).json({ errors: { email: "email not fond" } });
      };

      const isPasswordCorrect = await bcrypt.compare(password, staff.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ errors: { password: "wrong password" } });
      };

      delete staff.password

      const token = jwt.sign(staff.toJSON() , SECRET_KEY, { expiresIn: "1d" });
      res.status(200).json({ message: "success", result: token });

    } catch (err) {
      res
        .status(500)
        .json({ message: "something went wrong", errors: err.message });
    }
  }

  if (req.body.role === "Student") {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid){
      return res
        .status(404)
        .json({ message: "there is error with email or password.", errors })
    };

    const { email, password } = req.body;
    try {
      const student = await StudentModel.findOne({ email });

      if (!student) {
       return res.status(400).json({ errors: { email: "email not fond" } });
      };

      const isPasswordCorrect = await bcrypt.compare(password, student.password);

      if (!isPasswordCorrect){
        return res.status(400).json({ errors: { password: "wrong password" } });
      };
        

      // const payload = {
      //   id: student._id,
      //   email: student.email,
      //   firstName: student.firstName,
      //   lastName: student.lastName,
      //   role: student.role,
      //   courseId: student.courseId
      // };
      delete student.password

      const token = jwt.sign(student.toJSON(), SECRET_KEY, { expiresIn: "1d" });
      res.status(200).json({ message: "success", result: token });

    } catch (err) {
      res
        .status(500)
        .json({ message: "something went wrong", errors: err.message });
    }
  }
};

module.exports = login;
