const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    mobile_no: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    googleId: {
        type: String,
    },
    refresh_token: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;