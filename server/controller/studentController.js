const StudentModel = require("../models/studentModel");
const CourseModel = require("../models/courseModel");
const { ObjectId } = require("mongoose");
const { nullError } = require("../utils/Errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const getStudent = async (req, res) => {
  try {
    await StudentModel.findById(req.params.id, (err, result) => {
      if (err) console.log(err);
      res.status(200).json({ massage: "get Student success!", data: result });
    });
  } catch (err) {
    res.status(500).json({ massage: "get Student field", error: err });
  }
};
const getStudents = async (req, res) => {
  try {
    await StudentModel.find({}, (err, result) => {
      if (error) throw error;
      res.status(200).json({ massage: "get Students success!", data: result });
    });
  } catch (err) {
    res.status(500).json({ massage: "get Students field", error: err });
  }
};

const getStudentGradeById = async (req, res) => {
  try {
    StudentModel.findById(req.params.id, (error, result) => {
      if (error) throw error;
      res
        .status(200)
        .json({
          massage: "get Student grades by id success!",
          data: result.tests,
        });
    });
  } catch (err) {
    res
      .status(500)
      .json({ massage: "get Student grades by id failed", error: err });
  }
};

const addStudentTestById = async (req, res) => {
  try {
    await StudentModel.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { tests: { name: req.body.name, grade: req.body.grade } } },
      { new: true },
      (error, result) => {
        if (error) throw error;
        res.status(200).json({
          massage: "add test to a student by name was a success",
          data: result.tests,
        });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ massage: "adding a test to the test array failed", error: err });
  }
};

const updateStudentTestById = async (req, res) => {
  try {
    await StudentModel.findOneAndUpdate(
      { _id: req.params._id, tests: { $elemMatch: { _id: req.body.id } } },
      { $set: { "tests.$.grade": req.body.grade } },
      { new: true },
      (error, result) => {
        if (error) throw error;
        res.status(200).json({
          massage: "updating a student test was a success",
          data: result.tests,
        });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ massage: "updating a student test faild", error: err });
  }
};

const deleteStudentTestById = async (req, res) => {
  try {
    await StudentModel.findByIdAndUpdate(
      req.params._id,
      { $pull: { tests: { _id: req.body.id } } },
      { new: true },
      (error, result) => {
        if (error) throw error;
        res.status(200).json({
          massage: "deleting a student test was a success",
          data: result.tests,
        });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ massage: "deleting a student test faild", error: err });
  }
};
const updateStudent = async (req, res) => {
  try {
    const field = await req.body.field;
    if (field === "tests") {
      throw new Error("you cant update arrays only static fields");
    }
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
    const student = await StudentModel.findById(req.params.id, (err) => {
      if (err) throw err;
    });

    await CourseModel.findByIdAndUpdate(
      req.body.id,
      { $pull: { students: student._id } },
      (err, result) => {
        if (err) throw err;
        student.remove({});
        res.status(200).json({ massage: "delete by id student success!" });
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ massage: "delete by id student filed", error: err.message });
  }
};
const getSyllabusByCourse = async (req, res) => {
  try {
    await StudentModel.findById(req.body.id)
      .populate("courseId")
      .then((student) => {
        res.status(201).json({ massage: "The student is ", data: student });
      })
      .catch((err) => {
        res.status(500).json({ massage: "error with population", data: err });
      });
  } catch (err) {
    res.status(500).json({ massage: "wrong", error: err });
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
