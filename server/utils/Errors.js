const Validator = require("validator");
const isEmpty = require("is-empty");

const nullError = (result, res) => {
    try {
    if (!result) {
     throw new Error(
      "the result equal to null or undefined Please check that you are sending the required details in the correct format"
    );
  }else {
    res
    .status(200)
    .json({
        success: true,
        message: "success",
        data: result
    })
  }   
    } catch (err) {
      res
      .status(400)
      .json({
          success: false,
          message: "failed",
          error: err.message
      })
    }
};

const isEmptyId = (data) => {
data = !isEmpty(data) ? data : "";
if (Validator.isEmpty(data, {ignore_whitespace:false})) {
  throw new Error("The id field is empty");
}
if (!Validator.isLength(data, { min: 24, max: 24 })) {
  throw new Error("The id field is lest then 24-character, you are required to pass a 24-character entry");
}

};

const nullVariable = (data) => {
  if (!data) {
    throw new Error("failed to find information, please make sure you provide existing data in the appropriate format");
  };
};


const nullErrorForStudentGrades = (result, res) => {
  try {
    if (!result) {
      throw new Error(
        "the result equal to null or undefined Please check that you are sending the required details in the correct format"
      );
    } else {
      res
        .status(200)
        .json({
          success: true,
          message: "success",
          data: result.tests
        })
    }
  } catch (err) {
    res
      .status(400)
      .json({
        success: false,
        message: "failing",
        error: err.message
      })
  }
};

module.exports = {
  nullError,
  isEmptyId,
  nullVariable,
  nullErrorForStudentGrades
};
