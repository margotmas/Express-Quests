const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email },
    { abortEarly: false }
  );

  const errors = [];

  if (error) {
    error.details.forEach((detail) => {
      errors.push({ field: detail.context.key, message: detail.message });
    });
  }

  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  }

  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  }

  if (email == null) {
    errors.push({ field: "email", message: "This field is required" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ validationErrors: errors });
  }

  next();
};

module.exports = validateUser;
