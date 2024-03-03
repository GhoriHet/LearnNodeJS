const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    subcategory_id: {
        // type: mongoose.Types.ObjectId,
        type: Number,
        ref: 'Subcategories',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    descrription: {
        type: String,
        trim: true
    },
    discount: {
        type: Number,
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Products = mongoose.model("Products", productsSchema);
module.exports = Products;