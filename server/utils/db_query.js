const findCourseInformation = (req) => {
 return { _id: req.body.course_id,
    CourseInformation: {
      $elemMatch: {
        _id: req.body.courseInformationId,
      }
    }
  }
   
  };

module.exports={
    findCourseInformation,
}