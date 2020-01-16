const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";


  if (validator.isEmpty(data.email)) {
    errors.email = "Email can't be empty";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password can't be empty";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email must be valid email";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
