const StaffModel = require("../models/staffModel");
const CourseModel = require("../models/courseModel");
const { nullError, isEmptyId } = require("../utils/Errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const path = require('path');

const getAllStaff = async (req, res) => {
  try {
    await StaffModel.find({}, (err, result) => {
      nullError(result, res);
      if (err) throw err;
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "find staff filed",
        error: err.message
      });
  }
};
const getStaffById = async (req, res) => {
  try {
    await StaffModel.findById(req.params.id, (err, result) => {
      nullError(result, res);
      if (err) throw err;
    });
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "find by id staff filed",
        error: err.message
      });
  }
};
const deleteStaffById = async (req, res) => {
  try {
    await StaffModel.findByIdAndDelete(req.body.id, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({
          success: true,
          message: "delete by id student success!"
        });
    }
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        success: false,
        message: "delete by id student filed",
        data: err.message
      });
  }
};
const updateStaffById = async (req, res) => {
  try {
    if (req.file) {
      profileImg = req.file.filename;
      console.log(profileImg);
    }
     await StaffModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, profileImg},
      { new: true },
      (err, result) => {
        if (err) throw err;
        delete result.password
        const token = jwt.sign(result.toJSON(), SECRET_KEY, { expiresIn: "1d" });
        res
          .status(200)
          .json({
            success: true,
            message: "success",
            data: token
          });
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "update staff filed",
        error: err.message
      });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  deleteStaffById,
  updateStaffById,
};
