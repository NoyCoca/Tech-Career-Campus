const eventModel = require("../models/eventModel");
const staffModel = require("../models/staffModel");
const {nullError} = require("../utils/Errors");

const getAllEventPost = async (req, res) => {
  try {
    await eventModel.find({}, (error, result) => {
      if (error) throw error;
      res.status(200).json({ massage: "get event post success", data: result });
    });
  } catch (err) {
    res.status(500).json({ massage: "get event post field", error: err });
  }
};

const getEventById = async (req, res) => {
  try {
    await eventModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({ massage: "get event by id success", data: result });
    });
  } catch (err) {
    res.status(500).json({ massage: "get event by id field  ", error: err });
  }
};

const postNewEvent = async (req, res) => {
  const staff = await staffModel.findById(req.params.id);
  const { eventName, massage } = req.body;
  const newEvent = new eventModel({
    eventName: eventName,
    massage: massage,
    createBy: staff._id
  });
  try {
    await newEvent.save();
    res.status(200).json({
      massage: "post added successfully, success",
      data: newEvent,
    });
  } catch (err) {
    res.status(500).json({ massage: "post added field ", error: err });
  }
};

const deleteEventPost = async (req, res) => {
  try {
    await eventModel.findByIdAndRemove(req.params.id,(error, result) => {
      if (error) throw error;
      nullError(result , res);
     
    });
  } catch (error) {
    res.status(500).json({ massage: "deleted event field", error: error });
  }
};

const updateEventPost = async (req, res) => {
  try {
    await eventModel.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true },
      (error, result) => {
        if (error) throw error;
        nullError(result , res);
      }
    );
  } catch (error) {
    res.status(500).json({ massage: "update event field", error: error });
  }
};
module.exports = {
  getAllEventPost,
  getEventById,
  postNewEvent,
  deleteEventPost,
  updateEventPost,
};
