const StaffModel = require("../models/staffModel");
const CourseModel = require("../models/courseModel");
const { nullError , isEmptyId } = require("../utils/Errors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const getAllStaff = async (req, res) => {
  try {
    await StaffModel.find({}, (err, result) => {
      nullError(result, res);
      if (err) throw err;
    });
  } catch (err) {
    res.status(500).json({ massage: "find staff filed", data: error });
  }
};
const getStaffById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await StaffModel.findById(req.params.id, (err, result) => {
       nullError(result , res);
       if (err) throw err;
    });
  } catch (error) {
    res.status(500).json({ massage: "find by id staff filed", data: error });
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
          message: "delete by id staff success!"
        });
    }
    );
  } catch (err) {
    console.log(error);
    res
      .status(500)
<<<<<<< HEAD
      .json({
        success: false,
        message: "delete by id staff filed",
        data: err.message
      });
=======
      .json({ massage: "delete by id student filed", data: err.message });
>>>>>>> 2f4a3804a7155d7931a5b878ef21ad0d6714ec96
  }
};
const updateStaffById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
     await StaffModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true },
      (err, result) => {
        delete result.password
        const token = jwt.sign(result.toJSON(), SECRET_KEY, { expiresIn: "1d" });
<<<<<<< HEAD
        res
          .status(200)
          .json({
            success: true,
            message: "update staff success",
            data: token
          });
=======
        res.status(200).json({ message: "success", data: result, result: token });
        if (err) throw err;
>>>>>>> 2f4a3804a7155d7931a5b878ef21ad0d6714ec96
      }
    );
  } catch (error) {
    res.status(500).json({ massage: "update staff filed", data: error });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  deleteStaffById,
  updateStaffById,
};
