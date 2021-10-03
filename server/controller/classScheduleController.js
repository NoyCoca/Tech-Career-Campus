const ScheduleModel = require("../models/classScheduleModel");
const { nullError, isEmptyId } = require("../utils/Errors");
const { updateClassesQuery } = require("../utils/db_query");

const getAllClasses = (req, res) => {
  ScheduleModel.find().then((foundAppointment) => res.json(foundAppointment));
};
const updateClasses = (req, res) => {
  const dataChanged = req.body.changed[0];
  const dataAdded = req.body.added[0];
  const dataDeleted = req.body.deleted[0];

  if (req.body.changed.length > 0) {
    //Update an Appointment
    ScheduleModel.updateOne({ _id: dataChanged._id }, dataChanged, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully updated");
      }
    });
  } else if (req.body.added.length > 0) {
    //Create an Appointment
    const createAppointment = new ScheduleModel({
      Subject: dataAdded.Subject,
      StartTime: dataAdded.StartTime,
      EndTime: dataAdded.EndTime,
      Description: dataAdded.Description,
    });
    createAppointment.save();
  } else if (req.body.deleted.length > 0) {
    //Delete an Appointment
    ScheduleModel.deleteOne({ _id: dataDeleted._id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully Deleted");
      }
    });
  } else if (err) {
    console.log(err);
  }
};

module.exports = {
  getAllClasses,
  updateClasses,
};
