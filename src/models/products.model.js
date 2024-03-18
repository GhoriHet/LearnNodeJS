// const mongoose = require('mongoose');

const poolPromise = require("../db/mysql.db");

// const productsSchema = new mongoose.Schema({
//     _id: {
//         type: Number
//     },
//     subcategory_id: {
//         // type: mongoose.Types.ObjectId,
//         type: Number,
//         ref: 'Subcategories',
//         required: true
//     },
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     descrription: {
//         type: String,
//         trim: true
//     },
//     discount: {
//         type: Number,
//     },
//     // image: {
//     //     type: String,
//     //     required: true
//     // },
//     isActive: {
//         type: Boolean,
//         default: true
//     }
// }, {
//     timestamps: true,
//     versionKey: false
// });

// const Products = mongoose.model("Products", productsSchema);
// module.exports = Products;

const insertProduct = async (data) => {
    try {
        let sqlQuery = 'INSERT INTO salespeople	(snum, sname, city, comm) VALUES (?, ?, ?, ?)';
        let [rows] = await poolPromise.execute(sqlQuery, [data.snum, data.sname, data.city, data.comm])

        return rows
    } catch (error) {
        throw error.message
    }
}

const SelectSalespeople = async (data) => {
    try {
        let sqlQuery = 'SELECT * FROM salespeople';
        let [rows] = await poolPromise.execute(sqlQuery);

        return rows
    } catch (error) {
        throw error.message
    }
}

const deleteSalesPeople = async (id) => {
    try {
        let sqlQuery = `DELETE FROM salespeople WHERE snum=${id}`;
        let [rows] = await poolPromise.execute(sqlQuery);

        return rows
    } catch (error) {
        throw error.message
    }
}

const updateSalesPeople = async (data, id) => {
    try {
        let sqlQuery = `UPDATE salespeople SET sname = ?, city = ?, comm = ? WHERE snum = ?`;
        let [rows] = await poolPromise.execute(sqlQuery, [data.sname, data.city, data.comm, id]);
        
        return rows;
    } catch (error) {
        throw error.message;
    }
};

module.exports = {
    insertProduct,
    SelectSalespeople,
    deleteSalesPeople,
    updateSalesPeople
}