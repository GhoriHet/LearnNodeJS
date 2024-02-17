const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;