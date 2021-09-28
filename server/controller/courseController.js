const CourseModel = require("../models/courseModel");
const StaffModel = require("../models/staffModel");
const { collection } = require('../models/courseModel');
const {findCourseInformation} = require("../utils/db_query");
const { nullError } = require("../utils/Errors");

const addNewCourse = async (req, res) => {
  const staff = await StaffModel.findById(req.body.id);
  if (!staff) {
    res.status(401).json({ message: "staff not fond" });
  } else {
    const { name, CourseInformation, courseType } = req.body;
    const newCourse = new CourseModel({
      name: name,
      courseType: courseType,
      CourseInformation: CourseInformation,
      createBy: `${staff.firstName} ${staff.lastName} `,
    });
    try {
      await newCourse.save();
      staff.courses.push(newCourse);
      await staff.save();
      res
        .status(201)
        .json({ message: "create new course success", data: newCourse });
    } catch (error) {
      res
        .status(409)
        .json({ message: "create new course filed", error: error });
    }
  }
};
const getAllCourses = async (req, res) => {
  try {
    await CourseModel.find({}, (err, result) => {
      if (err) throw err;
      res.status(200).json({ massage: "get course success!", data: result });
    });
  } catch (err) {
    res.status(500).json({ massage: "get course field", error: err });
  }
};
const getCourseById = async (req, res) => {
  try {
    await CourseModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({ message: "get course by id success!", data: result });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "get course by id field", error: err.message });
  }
};
const deleteSubSubject = async (req, res) => {
  try {
    const array = await req.body.array
    const ArrayPath = `CourseInformation.$[].${array}`
    const ArrayObject = {};
    ArrayObject[ArrayPath] = { _id: req.body.ElementId }
    await CourseModel.findOneAndUpdate(
      findCourseInformation(req),
      { $pull: ArrayObject },
      {
        new: true,
      },
      (err, result) => { 
        if (err) throw err;
        nullError(result, res);
        // if (result !== null) {
        //   res
        //     .status(200)
        //     .json({ message: "Delete course was success!", data: result });
        // } else {
        //   const errorNull = new Error("result is null");
        //   res
        //     .status(500)
        //     .json({ message: "Delete course failed", error: errorNull.message });
        // }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update course field", error: err });
  }

};
const addSubSubject = async (req, res) => {
  try {

    const array = await req.body.array
    const ArrayPath = `CourseInformation.$[].${array}`
    const ArrayObject = {};
    if (array === "topics") {
      ArrayObject[ArrayPath] = { isDone: req.body.isDone, subject: req.body.subject }

    }
    else if (array === "links") {
      ArrayObject[ArrayPath] = { tasks: req.body.tasks, Presentations: req.body.Presentations, StudyAid: req.body.StudyAid }
    }
    else {
      const arrayError = new Error("you need to choose which array links or topics")
      res.status(301).json({ message: "update course failed", error: arrayError.message })
      throw arrayError
    }
    await CourseModel.findOneAndUpdate(
      findCourseInformation(req),
      { $addToSet: ArrayObject },
      {
        new: true,
      },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
        // if (result !== null) {
        //   res
        //     .status(200)
        //     .json({ message: "update corse success!", data: result });
        // } else {
        //   const errorNull = new Error("result is null");
        //   res
        //     .status(500)
        //     .json({ message: "update course field", error: errorNull.message });
        // }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update course field", error: err });
  }
};
const updateSubSubject = async (req, res) => {
  try {
    const array = await req.body.array
    const arrayField = await req.body.arrayField
    const ArrayPath = `CourseInformation.$.${array}.$[object].${arrayField}`
    const ArrayObject = {};
    ArrayObject[ArrayPath] = req.body.newValue
    await CourseModel.findOneAndUpdate(
      findCourseInformation(req),
      { $set: ArrayObject },
      {
        arrayFilters: [{ "object._id": { _id: req.body.array_id } }],
        upsert: true,
        new: true
      },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
        // if (result !== null) {
        //   res
        //     .status(200)
        //     .json({ message: "update corse success!", data: result });
        // } else {
        //   const errorNull = new Error("result is null");
        //   res
        //     .status(500)
        //     .json({ message: "update course field", error: errorNull.message });
        // }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update course field", error: err });
  }

};
const updateSubject = async (req, res) => {
  try {
    const field = await req.body.field
    if (field === "topics" || field === "links") {
      throw new Error("you cant update arrays only static fields")
    }
    const SubjectPath = `CourseInformation.$[object].${field}`
    const SubjectField = {}
    SubjectField[SubjectPath] = req.body.newValue
    await CourseModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: SubjectField },
      {
        arrayFilters: [{ "object._id": { _id: req.body.Subject_id } }],
        upsert: true,
        new:true
      },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
        // if (result !== null) {
        //   res
        //     .status(200)
        //     .json({ message: "update corse subject was success!", data: result });
        // } else {
        //   const errorNull = new Error("result is null");
        //   res
        //     .status(500)
        //     .json({ message: "update course subject field", error: errorNull.message });
        // }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update course subject field", error: err.message });
  }

};
const searchCorseAutocomplete = async (req, res) => {
  try {
      let result = await collection.aggregate([     
              {
                '$search': {
                  'index': 'default',
                  'text': {
                    'query': `${req.query.term}`,
                    'path': {
                      'wildcard': '*'
                    }
                  }
                }
              }
            
      ]).toArray();
      res.send(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};
const getStudentsByCourse = async (req, res) => {
  try {
    await CourseModel.findById(req.params.id)
      .populate('students')
      .then(course => {
        res.status(201).json({ massage: 'The student is ', data: course.students.map((student) => student) })
      })
      .catch(err => {
        res.status(500).json({ massage: 'error with population', data: err });
      })

  }
  catch (err) {
    res.status(500).json({ massage: "wrong", error: err })
  }
};
const deleteCorsById = async (req, res) => {
  try {
      await CourseModel.findByIdAndRemove(req.params.id).pre('remove', function(err,result,next) {
      this.model('staff').remove({ courses: this._id }, next)
      this.model('student').remove({ courseId: this._id }, next);
      if (err) throw err;
      // nullError(result, res);
      res.status(200).json({ massage: "delete by id cors success!", data: result });
  });;
  } catch (error) {
    res.status(500).json({ massage: "delete by id cors filed", data: error });
  }
};
module.exports = {
  addNewCourse,
  getAllCourses,
  getCourseById,
  deleteSubSubject,
  addSubSubject,
  updateSubSubject,
  updateSubject,
  searchCorseAutocomplete,
  getStudentsByCourse,
  deleteCorsById,
};
