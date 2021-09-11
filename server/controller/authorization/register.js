const StaffModel = require("../../models/staffModel");
const StudentModel = require("../../models/studentModel");
const bcrypt = require("bcrypt");
const validateRegisterInput = require("./registerValidator");

const register = async (req, res) => {
  if (req.body.registeredAs === "Staff") {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(401).json(errors);
    }
    await StaffModel.findOne({ email: req.body.email }, (err, staff) => {
      if (err) throw err;
      if (staff) {
        return res.status(401).json({ massage: "email already exists" });
      }

      //Password Encryption Before That it enters to the database
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          const { firstName, lastName, age, email, phone } = req.body;
          const newStaff = new StaffModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: req.body.password,
            age: age,
          });
          try {
            await newStaff.save();
            res
              .status(201)
              .json({
                success: true,
                message: "create new staff success",
                data: newStaff,
              });
          } catch (error) {
            res
              .status(401)
              .json({
                success: false,
                message: "create new staff filed",
                error: error,
              });
          }
        });
      });
    });
  }

  if (req.body.registeredAs === "Student") {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    await StudentModel.findOne({ email: req.body.email }, (err, student) => {
      if (err) throw err;
      if (student) {
        return res.status(400).json({ massage: "email already exists" });
      }
      //Password Encryption Before That it enters to the database
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          const staff = await StaffModel.findById(req.body.id);
          if (!staff) {
            res
              .status(400)
              .json({
                success: false,
                message: "find staff filed",
                error: error,
              });
          }

          const { firstName, lastName, age, email, courseName, phone } =
            req.body;
          const newStudent = new StudentModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: req.body.password,
            age: age,
            courseName: courseName,
            createBy: staff._id,
          });
          try {
            await newStudent.save();
            staff.students.push(newStudent);
            await staff.save();
            res
              .status(201)
              .json({
                success: true,
                message: "create new student success",
                data: newStudent,
              });
          } catch (error) {
            res
              .status(400)
              .json({
                success: false,
                message: "create new student filed",
                error: error,
              });
          }
        });
      });
    });
  }
};

module.exports = register;