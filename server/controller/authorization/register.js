const StaffModel = require("../../models/staffModel");
const StudentModel = require("../../models/studentModel");
const CourseModel = require("../../models/courseModel");
const bcrypt = require("bcrypt");
const validateRegisterInput = require("./registerValidator");
const { SendEmails } = require("../../utils/SendEmails");

const register = async (req, res) => {
  if (req.body.registeredAs === "Staff") {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res
      .status(401)
      .json({
        success: false,
        message: "there is error with validation",
        errors: errors 
      });
    }

    await StaffModel.findOne({ email: req.body.email }, (err, result) => {
      if (err) throw err;
      if (result) {
        return res
        .status(401)
        .json({                
          success: false,
          message: "email already exists",
        });
      }
      SendEmails(req, res);
      //Password Encryption Before That it enters to the database
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err; 
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          const { firstName, lastName, age, email, phone, role, IdNumber,responsible,job } = req.body;
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
            job: job? job:"",

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
          } catch (err) {
            res
            .status(400)
            .json({
              success: false,
              message: "create new staff filed",
              error: err.message,
            });
          }
        });
      });
    });
  }

  if (req.body.registeredAs === "Student") {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res
      .status(400)
      .json({
        success:false,
        message:"there is error with validation",
        error:errors
      });
    }

    await StudentModel.findOne({ email: req.body.email }, (err, result) => {
      if (err) throw err;
      if (result) {
        return res
        .status(400)
        .json({
          success: false,
          message: "email already exists",
      });
    }
      SendEmails(req, res);
      //Password Encryption Before That it enters to the database
      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          const course = await CourseModel.findById(req.body.courseId);
          if (!course) {
            res
              .status(403)
              .json({
                success: false,
                message: "filed",
                error: "find course filed",
              });
          }

          const { firstName, lastName, age, email, courseName, phone, role, IdNumber,gender } = req.body;
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
            IdNumber: IdNumber? IdNumber: "",
            gender:gender
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
          } catch (err) {
            res
            .status(400)
            .json({
              success: false,
              message: "create new student filed",
              error: err.message
            });
          }
        });
      });
    });
  }
};

module.exports = register;
