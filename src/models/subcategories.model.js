const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema(
    {
        _id: {
            type: Number
        },
        category_id: {
            // type: mongoose.Types.ObjectId,
            type: Number,
            ref: 'Categories',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        image: {
            type: String,
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

const Subcategories = mongoose.model("Subcategories", subcategoriesSchema);
module.exports = Subcategories