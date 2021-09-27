const CourseModel = require("../models/courseModel");
const StaffModel = require("../models/staffModel");
const { collection } = require('../models/courseModel');
const {findCourseInformation , } = require("../utils/db_query");
const { nullError, isEmptyId ,nullVariable} = require("../utils/Errors");

const addNewCourse = async (req, res) => {
  try {
  isEmptyId(req.body.id)
  const staff = await StaffModel.findById(req.body.id);
  nullVariable(staff);
    const { name, CourseInformation, courseType } = req.body;
    const newCourse = new CourseModel({
      name: name,
      courseType: courseType,
      CourseInformation: CourseInformation,
      createBy: `${staff.firstName} ${staff.lastName} `,
    });
      await newCourse.save();
      res
        .status(201)
        .json({
          success: true,
          message: "create new course success",
          data: newCourse
        });
    } catch (err) {
      res
        .status(400)
        .json({
          success: false,
          message: "create new course filed",
          error: err.message
        });
    }

};

const getAllCourses = async (req, res) => {
  try {
    await CourseModel.find({}, (err, result) => {
      if (err) throw err;
      nullError(result, res);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "get course field",
        error: err.message
      });
  }
};

const getCourseById = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await CourseModel.findById(req.params.id, (err, result) => {
      if (err) throw err;
      nullError(result, res);
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "get course by id field",
        error: err.message
      });
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
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "update course field",
        error: err.message
      });
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
      res
        .status(400)
        .json({
          success: false,
          message: "update course failed",
          error: arrayError.message
        })
      throw arrayError
      // מציג שגיאה וזורק שוב??
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
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "update course field",
        error: err.message
      });
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
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "update course field",
        error: err.message
      });
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
      { _id: req.body.course_id },
      { $set: SubjectField },
      {
        arrayFilters: [{ "object._id": { _id: req.body.Subject_id } }],
        upsert: true,
        new: true
      },
      (err, result) => {
        if (err) throw err;
        nullError(result, res);
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "update course subject field",
        error: err.message
      });
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
      res.send(result);
  } catch (err) {
    res
    .status(500)
    .json({
      success: true,
      message: "failed aggregate",
      error: err.message
    })
  }
};

const getStudentsByCourse = async (req, res) => {
  try {
    isEmptyId(req.params.id);
    await CourseModel.findById(req.params.id)
      .populate('students')
      .then(course => {
        res
          .status(200)
          .json({
            success: true,
            message: 'The student is ',
            data: course.students.map((student) => student)
          })
      })
      .catch(err => {
        res
          .status(400)
          .json({
            success: false,
            message: 'error with population',
            error: err.message
          });
      })

  }
  catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "wrong",
        error: err.message
      })
  }
};

const deleteCorsById = async (req, res) => {
  try {
    isEmptyId(req.body.id);
      await CourseModel.findByIdAndDelete(req.body.id , (err, result) =>{
      if (err) throw err;
      res
      .status(200)
      .json({
        success: true,
         message: "delete by id cors success!"
        });

    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "update course field",
        error: err.message,
  })
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
}
