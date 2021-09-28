
const nullError = (result, res) => {
    try {
    if (result === null || result === undefined) {
     throw new Error(
      "the result equal to null or undefined Please check that you are sending the required details in the correct format"
    );
  }else {
        res
          .status(200)
          .json({ massage: "success!", data: result });
      }      
    } catch (error) {
    res
      .status(500)
      .json({ massage: "filed", data: error.message });
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
module.exports = {
  nullError,
  isEmptyId,
};
