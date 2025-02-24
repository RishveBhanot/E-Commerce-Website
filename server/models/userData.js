const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmpassword: {
        type: String,
        required: true,
        unique: true
    }
});

const userDataModel = mongoose.model('userData', userDataSchema);

module.exports = userDataModel;