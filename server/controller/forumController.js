const ForumModel = require("../models/forumModel");
const StaffModel = require("../models/staffModel");
const StudentModel = require("../models/studentModel");
const {nullError , nullVariable ,isEmptyId} = require("../utils/Errors")

const messagesByStaff = async (req, res) => {
  try {
  isEmptyId(req.body._id)  
  const staff = await StaffModel.findById(req.body._id);
  nullVariable(staff); 
  const newMessages = new ForumModel({
    firstName: req.body.post.firstName,
    email: req.body.post.email,
    title: req.body.post.title,
    message: req.body.post.message,
    authorByStaff: staff._id,
  });
    await newMessages.save();
    staff.messages.push(newMessages);
    await staff.save();
    res
      .status(201)
      .json({
        success: true,
        message: "create new message success",
        data: newMessages
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "create new message filed",
        error: err.message
      });
  }
};
const messagesByStudent = async (req, res) => {
  try { 
  isEmptyId(req.body._id)  
  const student = await StudentModel.findById(req.body._id);
  nullVariable(student);
  const newMessages = new ForumModel({
    firstName: req.body.post.firstName,
    email: req.body.post.email,
    title: req.body.post.title,
    message: req.body.post.message,
    authorByStudent: student._id,
  });
    await newMessages.save();
    student.messages.push(newMessages);
    await student.save();
    res
      .status(201)
      .json({
        success: true,
        message: "create new message success",
        data: newMessages
      });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "create new message filed",
        error: err.message
      });
  }
};
const getAllMessages = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    const total = await ForumModel.countDocuments({});

    await ForumModel.find({}, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({
          success: true,
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
    res
      .status(500)
      .json({
        success: false,
        message: "problem in database",
        error: err.message
      });
  }
};
const deleteMessage = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await ForumModel.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({
          success: true,
          message: "delete message success",
          result: result
        });
    });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "delete message failed",
        error: err.message
      });
  }
};
const updateMessage = async (req, res) => {
  const post = req.body.post;
  try {
    isEmptyId(req.params.id);
    await ForumModel.findByIdAndUpdate(
      req.params.id,
      post,
      { new: true },
      (err, result) => {
        if (err) throw err;
        res
          .status(200)
          .json({
            success: true,
            message: "updated message success",
            data: result
          });
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "problem with update",
        error: err.message
      });
  }
};
const getPost = async (req, res) => {
  try {
    isEmptyId(req.params.id)
    await ForumModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({
          success: true,
          message: "get message success",
          data: result
        });
    });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "get message failed",
        error: err.message
      });
  }
};
const commentPost = async (req, res) => {
  isEmptyId(req.params.id)
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