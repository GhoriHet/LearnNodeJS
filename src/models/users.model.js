const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        // _id: {
        //     type: Number
        // },
        name: {
            type: String,
            required: true,
            // required: true,
            trim: true,
        },
        address: {
            type: String,
            // required: true,
            trim: true,
        },
        mobile_no: {
            type: String,
            // required: true,
            trim: true,
        },
        email: {
            type: String,
            // required: true,
            trim: true,
        },
        password: {
            type: String,
            // required: true,
            trim: true,
        },
        role: {
            type: String,
            required: true,
            trim: true,
        },
        refresh_token: {
            type: String,
            // required: true,
            trim: true,
        },
        googleId: {
            type: String,
        },
        facebookId: {
            type: String,
        },
        avatar: {
            type: {
                public_id: String,
                url: String
            }
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;