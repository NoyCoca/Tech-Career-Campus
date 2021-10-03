const StaffModel = require("../models/staffModel");
const { nullError, isEmptyId } = require("../utils/Errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const path = require('path');
const fs = require('fs');

const getAllStaff = async (req, res) => {
  try {
    await StaffModel.find({}, (err, result) => {
      if (err) throw err;
      nullError(result, res);
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
    isEmptyId(req.params.id);
    await StaffModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      nullError(result, res);
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
    isEmptyId(req.body.id);
    await StaffModel.findByIdAndDelete(req.body.id, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({
          success: true,
          message: "delete by id staff success!",
          data:result
        });
    }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "delete by id staff filed",
        data: err.message
      });
  }
};

const updateStaffById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
     await StaffModel.findByIdAndUpdate(
      req.params.id,
      // { $set: req.body, profileImg},
      { $set: req.body},
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
