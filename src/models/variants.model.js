const mongoose = require('mongoose');

const variantsSchema = new mongoose.Schema(
    {
        _id: {
            type: Number
        },
        product_id: {
            // type: mongoose.Types.ObjectId,
            type: Number,
            ref: 'Products',
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            default: []
        },
        stock: {
            type: Number,
            required: true
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
);

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants;