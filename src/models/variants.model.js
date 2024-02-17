const mongoose = require('mongoose');

const variantsSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        attributes: {
            type: Object,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
);

const Variants = mongoose.model("Variants", variantsSchema);
module.exports = Variants;