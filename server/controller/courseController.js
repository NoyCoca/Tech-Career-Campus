const CourseModel = require("../models/courseModel");
const StaffModel = require("../models/staffModel");

const addNewCourse = async (req, res) => {
  const staff = await StaffModel.findById(req.body.id);
  if (!staff) {
    res.status(401).json({ message: "staff not fond" });
  } else {
    const { name, CourseInformation } = req.body;
    const newCourse = new CourseModel({
      name: name,
      CourseInformation: CourseInformation,
      createBy: staff._id,
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
const getCourseByName = async (req, res) => {
  try {
    await CourseModel.find({ name: req.body.name }, (err, result) => {
      if (err) throw err;
      res
        .status(200)
        .json({ message: "get course by name success!", data: result });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "get course by name field", error: err.message });
  }
};
const deleteSubSubject = async (req, res) => {
  try {
    const query = {
      _id: req.body.course_id,
      CourseInformation: {
        $elemMatch: {
          _id: req.body.courseInformationId,
        },
      },
    };
    const array = await req.body.array
    const ArrayPath = `CourseInformation.$[].${array}`
    const ArrayObject = {};
    ArrayObject[ArrayPath] = { _id: req.body.ElementId }
    await CourseModel.findOneAndUpdate(
      query,
      { $pull: ArrayObject },
      {
        new: true,
      },
      (err, result) => {
        if (err) throw err;

        if (result !== null) {
          res
            .status(200)
            .json({ message: "Delete course was success!", data: result });
        } else {
          const errorNull = new Error("result is null");
          res
            .status(500)
            .json({ message: "Delete course faild", error: errorNull.message });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update course field", error: err });
  }

};
const addSubSubject = async (req, res) => {
  try {
    const query = {
      _id: req.body.course_id,
      CourseInformation: {
        $elemMatch: {
          _id: req.body.courseInformationId,
        },
      },
    };
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
      res.status(301).json({ message: "update course faild", error: arrayError.message })
      throw arrayError
    }
    await CourseModel.findOneAndUpdate(
      query,
      { $addToSet: ArrayObject },
      {
        new: true,
      },
      (err, result) => {
        if (err) throw err;

        if (result !== null) {
          res
            .status(200)
            .json({ message: "update corse success!", data: result });
        } else {
          const errorNull = new Error("result is null");
          res
            .status(500)
            .json({ message: "update course field", error: errorNull.message });
        }
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
    const ArrayPath = `CourseInformation.$.${array}.$[objcet].${arrayField}`
    const ArrayObject = {};
    ArrayObject[ArrayPath] = req.body.newValue
    const query = {
      _id: req.body._id,
      CourseInformation: {
        $elemMatch: {
          _id: req.body.courseInformationId,
        },
      },
    };
    await CourseModel.findOneAndUpdate(
      query,
      { $set: ArrayObject },
      {
        arrayFilters: [{ "objcet._id": { _id: req.body.array_id } }],
        upsert: true
      },
      (err, result) => {
        if (err) throw err;

        if (result !== null) {
          res
            .status(200)
            .json({ message: "update corse success!", data: result });
        } else {
          const errorNull = new Error("result is null");
          res
            .status(500)
            .json({ message: "update course field", error: errorNull.message });
        }
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
    const SubjectPath = `CourseInformation.$[objcet].${field}`
    const SubjectField = {}
    SubjectField[SubjectPath] = req.body.newValue
    await CourseModel.findOneAndUpdate(
      { _id: req.body._id },
      { $set: SubjectField },
      {
        arrayFilters: [{ "objcet._id": { _id: req.body.Subject_id } }],
        upsert: true
      },
      (err, result) => {
        if (err) throw err;

        if (result !== null) {
          res
            .status(200)
            .json({ message: "update corse subject was success!", data: result });
        } else {
          const errorNull = new Error("result is null");
          res
            .status(500)
            .json({ message: "update course subject field", error: errorNull.message });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "update course subject field", error: err.message });
  }

};

module.exports = {
  addNewCourse,
  getAllCourses,
  getCourseByName,
  deleteSubSubject,
  addSubSubject,
  updateSubSubject,
  updateSubject
};
