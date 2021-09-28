const HomeworkModel = require("../models/homeworkModel");
const CourseModel = require("../models/courseModel");
const { nullError, isEmptyId } = require("../utils/Errors");

const creatNewHomework = async (req, res) => {
  try {
    isEmptyId(req);
    const { subject, description, id } = req.body;
    const course = await CourseModel.findById(id);
    const newHomework = new HomeworkModel({
      subject: subject,
      description: description,
      courseId: course._id,
    });

    await newHomework.save();
    course.homeworks.push(newHomework);
    await course.save();
    res
      .status(201)
      .json({ message: "create new homework success", data: newHomework });
  } catch (err) {
    res
      .status(500)
      .json({ message: "create new homework filed", error: err.message });
  }
};
const getAllHomework = async (req, res) => {
  try {
    isEmptyId(req);
    await HomeworkModel.find({}, (err, result) => {
      nullError(result, res);
      if (err) throw err;
    });
  } catch (err) {
    res.status(500).json({ massage: "find homework filed", error: err });
  }
};
const updateHomeworkById = async (req, res) => {
  try {
    isEmptyId(req);
    await HomeworkModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
      }
    );
  } catch (err) {
    res.status(500).json({ massage: "update homework filed", error: err });
  }
};
const deleteHomeworkById = async (req, res) => {
  isEmptyId(req);
  try {
    await HomeworkModel.findByIdAndDelete(req.body.id, (err, result) => {
      if (err) throw err;
      nullError(result, res);
    });
  } catch (error) {
    res
      .status(500)
      .json({ massage: "delete by id homework filed", error: err.message });
  }
};

module.exports = {
  creatNewHomework,
  getAllHomework,
  updateHomeworkById,
  deleteHomeworkById,
};
