const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
 
  
  Subject:{
    require:true,
    type:String
  },
  StartTime:{
    require:true,
    type:Date
  },

  EndTime:{
    require:true,
    type:Date
  },

  Description:{
    require:true,
    type:String
  },
}
);

const Schedule = mongoose.model("classSchedule", scheduleSchema);
module.exports = Schedule;
