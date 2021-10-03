const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
      default: Date.now,
      index: { expires: '40d' }
    },
    createBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);
module.exports = Event;
