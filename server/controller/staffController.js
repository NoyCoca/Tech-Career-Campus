const StaffModel = require('../models/staffModel');


const getAllStaff = async (req, res) => {
  try {
    await StaffModel.find({}, (err, result) => {
      if (err) throw err;
      res.status(200).json({ massage: "find staff success!", data: result })
    });
  } catch (err) {
    res.status(500).json({ massage: "find staff filed", data: result });
  }
}

const getStaffById = async (req, res) => {
  try {
    await StaffModel.findById(req.body.id, (err, result) => {
      if (err) throw err;
      res.status(200).json({ massage: "find by id staff success!", data: result })
    });
  } catch (error) {
    res.status(500).json({ massage: "find by id staff filed", data: result });
  }
}

const deleteStaffById = async (req, res) => {
  try {
    await StaffModel.findByIdAndDelete(req.body.id, (err, result) => {
      if (err) throw err;
      res.status(200).json({ massage: "delete by id staff success!", data: result })
    })
  } catch (error) {
    res.status(500).json({ massage: "delete by id staff filed", data: result });
  }
}

const updateStaffById = async (req, res) => {
  try {
    await StaffModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, result) => {
      if (err) throw err;
      res.status(200).json({ massage: "update staff success!", data: result })
    })
  } catch (error) {
    res.status(500).json({ massage: "update staff filed", data: result });
  }
}

const getStudentsByStaff = async (req, res) => {
  try {
      await StaffModel.findById(req.body.id)
          .populate('students')
          .then(staff => {
              res.status(201).json({ massage: 'The student is ', data: staff.students.map((student) => student ) })
          })
          .catch(err => {
              res.status(500).json({ massage: 'error with population', data: err });
          })

  }
  catch (err) {
      res.status(500).json({ massage: "wrong", error: err })
  }
}


module.exports = {
  getAllStaff,
  getStaffById,
  deleteStaffById,
  updateStaffById,
  getStudentsByStaff
};