const ForumModel = require("../models/forumModel");
const StaffModel = require("../models/staffModel");
const StudentModel = require("../models/studentModel");

const messagesByStaff = async (req, res) => {
  const staff = await StaffModel.findById(req.body._id);
  console.log(staff);
  const newMessages = new ForumModel({
    firstName: req.body.post.firstName,
    email: req.body.post.email,
    title: req.body.post.title,
    message: req.body.post.message,
    authorByStaff: staff._id,
  });
  try {
    await newMessages.save();
    staff.messages.push(newMessages);
    await staff.save();
    res
      .status(201)
      .json({ message: "create new message success", data: newMessages });
  } catch (error) {
    res.status(500).json({ message: "create new message filed", error: error });
  }
};

const messagesByStudent = async (req, res) => {
  const student = await StudentModel.findById(req.body.id);
  if (!student) {
    return res.status(500).json({ message: "student not fond", error: error });
  }
  const newMessages = new ForumModel({
    firstName: req.body.post.firstName,
    email: req.body.post.email,
    title: req.body.post.title,
    message: req.body.post.message,
    authorByStudent: student.id,
  });
  try {
    await newMessages.save();
    student.messages.push(newMessages);
    await student.save();
    res
      .status(201)
      .json({ message: "create new message success", data: newMessages });
  } catch (error) {
    res.status(500).json({ message: "create new message filed", error: error });
  }
};
const getAllMessages = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of evry page
    const total = await ForumModel.countDocuments({});

    await ForumModel.find({}, (err, result) => {
      if (err) console.log(err);
      res.json({
        message: "success",
        data: result,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
    })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
  } catch (err) {
    res.json({ message: "problem in database", error: err });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await ForumModel.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) throw err;
      res.json({ message: "delete message success", data: result });
    });
  } catch (err) {
    res.json({ message: "problem with update", error: err });
  }
};
const updateMessage = async (req, res) => {
  const post = req.body.post;
  try {
    await ForumModel.findByIdAndUpdate(
      req.params.id,
      post,
      { new: true },
      (err, result) => {
        if (err) throw err;
        res.json({ message: "updated message success", data: result });
      }
    );
  } catch (err) {
    res.json({ message: "problem with update", error: err });
  }
};
const getPost = async (req, res) => {
  try {
    await ForumModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      res.json({ message: "got message success", data: result });
    });
  } catch (err) {
    res.json({ message: "problem with update", error: err });
  }
};
const commentPost = async (req, res) => {
  const { value } = req.body;
  const post = await ForumModel.findById(req.params.id);

  post.comments.push(value);
  const updatedPost = await ForumModel.findByIdAndUpdate(req.params.id, post, {
    new: true,
  });
  res.json(updatedPost)
};

module.exports = {
  commentPost,
  getPost,
  messagesByStaff,
  messagesByStudent,
  getAllMessages,
  deleteMessage,
  updateMessage,
};
