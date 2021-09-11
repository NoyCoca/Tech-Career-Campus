const StudentModel = require("../models/studentModel");



const getStudent = async (req, res) => {
  try {
    await StudentModel.find({}, (err, result) => {
      if (err) console.log(err);
      res.status(200).json({ massage: "get Student success!", data: result });
    });
  } catch (err) {
    res.status(500).json({ massage: "get Student field", error: err });
  }
};

const getStudentGradeById = async (req, res) => {
  try {
    StudentModel.findById(req.body.id, (error, result) => {
      if (error) throw error;
      res
        .status(200)
        .json({ massage: "get Student grades by id success!", data: result.tests });
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
        res
          .status(200)
          .json({
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
      { $set: { "tests.$.grade": req.body.grade } }, { new: true },
      (error, result) => {
        if (error) throw error;
        res
          .status(200)
          .json({
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
        res
          .status(200)
          .json({
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
    const field = await req.body.field
    if (field === "tests") {
      throw new Error("you cant update arrays only static fields")
    }
    const StudentField = {}
    StudentField[field] = req.body.newValue
    await StudentModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: StudentField },
      (err, result) => {
        if (err) throw err;

        if (result !== null) {
          res
            .status(200)
            .json({ message: "update student  was success!", data: result });
        } else {
          const errorNull = new Error("result is null");
          res
            .status(500)
            .json({ message: "update student  faild", error: errorNull.message });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update student  faild", error: err.message });
  }

};
const deleteStudent = async (req, res) => {
  await StudentModel.findByIdAndDelete(
    { _id: req.body._id },
    (err, result) => {
      if (err) throw err;

      if (result !== null) {
        res
          .status(200)
          .json({ message: "delete student  was success!", data: result });
      } else {
        const errorNull = new Error("result is null");
        res
          .status(500)
          .json({ message: "delete student  faild", error: errorNull.message });
      }
    }
  );
}
module.exports = {
  getStudent,
  getStudentGradeById,
  addStudentTestById,
  updateStudentTestById,
  deleteStudentTestById,
  updateStudent,
  deleteStudent,
};
