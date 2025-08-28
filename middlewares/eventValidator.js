const Joi = require('joi');

const getSchema = Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required(),
})

const createSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.date().required(),
    location: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
})

const validateGetEvent = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).send("body is required")
    }
    const { error } = getSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next()
}

const validateCreateEvent = (req, res, next) => {
    if (req.body === undefined) {
        return res.status(400).send("body is required")
    }
    const { error } = createSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next()
}

module.exports = { validateGetEvent, validateCreateEvent }