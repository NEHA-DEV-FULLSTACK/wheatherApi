const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    token: { type: String, require: true },
})

module.exports = mongoose.model('token', tokenSchema);