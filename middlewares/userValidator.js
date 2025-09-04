const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required().messages({
    "string.base": "Username must be a string",
    "string.alphanum": "Username can only contain letters and numbers",
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 20 characters",
    "any.required": "Username is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
  }),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    // error.details is always defined if validation fails
    const message = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ message: message });
  }
  next();
};

module.exports = { validateUser };
