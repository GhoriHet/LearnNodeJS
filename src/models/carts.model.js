const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    pid: {
        type: mongoose.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const cartsSchema = new mongoose.Schema({
    items: [itemsSchema],
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const Carts = mongoose.model("Carts", cartsSchema);
module.exports = Carts;