const StaffModel = require("../../models/staffModel");
const StudentModel = require("../../models/studentModel");
const CourseModel = require("../../models/courseModel");
const bcrypt = require("bcrypt");
const validateRegisterInput = require("./registerValidator");
const { SendEmails } = require("../../utils/SendEmails");
const path = require("path")

const register = async (req, res) => {
  if (req.body.registeredAs === "Staff") {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(401).json({ errors: errors });
    }

    await StaffModel.findOne({ email: req.body.email }, (err, staff) => {
      if (err) throw err;
      if (staff) {
        return res.status(401).json({ errors: { email: "email already exists" } });
      }
      SendEmails(req, res);
      //Password Encryption Before That it enters to the database
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          const { firstName, lastName, age, email, phone, role, IdNumber,responsible,jod } = req.body;
          const newStaff = new StaffModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: req.body.password,
            age: age,
            role: role !=='Student'?role:'Staff',
            profileImg: req.file ? req.file.path : "",
            IdNumber: IdNumber? IdNumber: "",
            responsible: responsible? responsible:"",
            jod: jod? jod:"",

          });
          try {

            await newStaff.save();
            res.status(201).json({
              success: true,
              message: "create new staff success",
              data: newStaff,
            });
          } catch (error) {
            res.status(401).json({
              success: false,
              message: "create new staff filed",
              errors: error,
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
        return res.status(400).json({ errors: { email: "email already exists" } });
      }
      SendEmails(req, res);
      //Password Encryption Before That it enters to the database
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          const course = await CourseModel.findById(req.body.courseId)
          if (!course) {
            res
              .status(403)
              .json({
                success: false,
                message: "filed",
                errors: "find course filed",
              });
          }

          const { firstName, lastName, age, email, courseName, phone, role, IdNumber } = req.body;
          const newStudent = new StudentModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: req.body.password,
            age: age,
            courseName: courseName,
            courseId: course._id,
            role: role !== 'Staff'?role:'Student',
            profileImg: req.file ? req.file.path : "",
            IdNumber: IdNumber? IdNumber: ""
          });
          try {
            await newStudent.save();
            course.students.push(newStudent);
            await course.save();
            res
              .status(201)
              .json({
                success: true,
                message: "create new student success",
                data: newStudent,
              });
          } catch (error) {
            res.status(400).json({
              success: false,
              message: "create new student filed",
              errors: error,
            });
          }
        });
      });
    });
  }
};

module.exports = register;