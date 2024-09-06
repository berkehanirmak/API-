const mongoose = require("mongoose");

const AuthScema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("auth", AuthScema);