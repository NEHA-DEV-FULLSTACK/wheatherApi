const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(2).required(),
})

const validateUser = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).send("user data is required")
    }
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next()
}

module.exports = { validateUser }