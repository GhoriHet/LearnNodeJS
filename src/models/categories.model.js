const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema(
    {
        _id: {
            type: Number
        },
        category_name: {
            type: String,
            required: true,
            trim: true
        },
        category_desc: {
            type: String,
            trim: true
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

const Categories = mongoose.model("Categories", categoriesSchema);
module.exports = Categories