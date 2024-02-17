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
});

const ordersSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    items: [itemsSchema],

    shipping_address: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    total_amount: {
        type: Number,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }
});

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;