const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const authModel = mongoose.model('authuserdata', authSchema);

module.exports = { authModel };