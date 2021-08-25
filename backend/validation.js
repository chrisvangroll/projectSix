const joi = require('joi');

// Register Validation
const signupValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required()
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required()
  });
  return schema.validate(data);
};



module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;