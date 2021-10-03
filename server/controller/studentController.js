const StudentModel = require("../models/studentModel");
const CourseModel = require("../models/courseModel");
const fs =require("fs");
const { nullError, isEmptyId, nullVariable,nullErrorForStudentGrades } = require("../utils/Errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const getStudent = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await StudentModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      nullError(result, res);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "get Student field",
        error: err.message
      });
  }
};

const getStudents = async (req, res) => {
  try {
    await StudentModel.find({}, (err, result) => {
      if (err) throw err;
      nullError(result, res);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "get Students field",
        error: err.message
      });
  }
};

const getStudentGradeById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    StudentModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      nullErrorForStudentGrades(result,res)

    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "get Student grades by id failed",
        error: err.message
      });
  }
};

const addStudentTestById = async (req, res) => {
  try {
    isEmptyId(req.body.id);
    await StudentModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { tests: { name: req.body.name, grade: req.body.grade } } },
      { new: true },
      (err, result) => {
        if (err) throw err;
        nullErrorForStudentGrades(result,res)
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "adding a test to the test array failed",
        error: err.message
      });
  }
};

const updateStudentTestById = async (req, res) => {
  try {
    isEmptyId(req.body.id);
    isEmptyId(req.params._id);
    await StudentModel.findOneAndUpdate(
      { _id: req.params._id, tests: { $elemMatch: { _id: req.body.id } } },
      { $set: { "tests.$.grade": req.body.grade } }, { new: true },
      (err, result) => {
        if (err) throw err;
        nullErrorForStudentGrades(result,res)
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "updating a student test failed",
        error: err.message
      });
  }
};

const deleteStudentTestById = async (req, res) => {
  try {
    await StudentModel.findByIdAndUpdate(
      req.params._id,
      { $pull: { tests: { _id: req.body.id } } },
      { new: true },
      (err, result) => {
        if (err) throw err;
        nullErrorForStudentGrades(result,res)
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "deleting a student test failed",
        error: err.message
      });
  }
};

const updateStudent = async (req, res) => { 
  try {
    isEmptyId(req.params.id);
    
    await StudentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, result) => {
        if (err) throw err;
        let profilePic;
        if (req.file) {
          profilePic = req.file.path;
          try {
            fs.unlinkSync("" + result.profileImg);
          } catch (error) {
            console.log(error);
          }
        } else {
          profilePic = result.profileImg;
        }
        result.profileImg = profilePic;
        result.save();
        delete result.password
        const token = jwt.sign(result.toJSON(), SECRET_KEY, { expiresIn: "1d" });
        res
          .status(200)
          .json({
            success: true,
            message: "success",
            data: result,
            result: token
          });
        }
      )
    } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "update student failed",
        error: err.message
      });
   }
};


const deleteStudent = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    const student = await StudentModel.findById(req.params.id, (err) => {
      if (err) throw err;
    });
    nullVariable(student);
    await CourseModel.findByIdAndUpdate(
      req.body.courseId,
      { $pull: { students: student._id } },
      (err, result) => {
        if (err) throw err;
        student.remove();
        res
          .status(200)
          .json({
            success: true,
            message: "delete by id student success!",
            data:student
          });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "delete by id student filed",
        error: err.message
      });
  }
};

const getSyllabusByCourse = async (req, res) => {
  try {
    isEmptyId(req.body.id);
    await StudentModel.findById(req.body.id)
      .populate('courseId')
      .then(student => {
        res
          .status(200)
          .json({
            success: true,
            message: 'The student is ',
            data: student
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            success: false,
            message: 'error with population',
            error: err.message
          });
      })

  }
  catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "wrong",
        error: err.message
      })
  }
};
module.exports = {
  getStudent,
  getStudents,
  getStudentGradeById,
  addStudentTestById,
  updateStudentTestById,
  deleteStudentTestById,
  updateStudent,
  deleteStudent,
  getSyllabusByCourse,
};
