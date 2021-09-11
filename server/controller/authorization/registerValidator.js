const Validator = require("validator");
const isEmpty = require("is-empty");
const validateRegisterInput = (data) => {
  let errors = {};
  data.firstName = isEmpty(data.firstName) ? "" : data.firstName;
  data.lastName = isEmpty(data.lastName) ? "" : data.lastName;
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";


  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
  
    errors.lastName = "Last Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = "Password must be at least 8 characters";
  }
  if (!Validator.isLength(data.phone, { min: 8, max: 10 })) {
    errors.phone = "phone must be at least 8 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
