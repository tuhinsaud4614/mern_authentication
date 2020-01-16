const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name can't be empty";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email can't be empty";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password can't be empty";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password doesn't match";
  }

  if (
    !validator.isLength(data.name, {
      min: 3,
      max: 30
    })
  ) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (
    !validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email must be valid email";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
