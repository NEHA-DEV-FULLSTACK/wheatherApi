
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    date: { type: Date, require: true },
    time: { type: Date, require: true },
    location: { type: String, require: true },
    latitude: { type: Number, require: true },
    longitude: { type: Number, require: true },
    eventData: { type: Object, require: true },
    isDeleted: { type: Boolean, require: true },
})

module.exports = mongoose.model('event', schema)