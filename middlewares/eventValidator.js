const Joi = require("joi");

// Validation for creating an event
const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  eventDateTime: Joi.date().required(),
  location: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

const validateCreateEvent = (req, res, next) => {
  if (!req.body) return res.status(400).json({ message: "Request body is missing" });

  const { error } = createEventSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ message });
  }
  next();
};

module.exports = { validateCreateEvent };
