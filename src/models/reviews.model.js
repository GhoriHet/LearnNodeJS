const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema(
    {
        _id: {
            type: Number
        },
        user_id: {
            // type: mongoose.Types.ObjectId,
            type: Number,
            ref: 'Users',
            required: true
        },
        product_id: {
            // type: mongoose.Types.ObjectId,
            type: Number,
            ref: 'Products',
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true,
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

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;