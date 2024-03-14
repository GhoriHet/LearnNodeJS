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
        let res = poolPromise.execute(sqlQuery, [data.snum, data.sname, data.city, data.comm])

        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
}

const SelectSalespeople = async (data) => {
    try {
        let sqlQuery = 'SELECT * FROM salespeople';
        let res = await poolPromise.execute(sqlQuery);

        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
}

const deleteSalesPeople = async (id) => {
    try {
        let sqlQuery = `DELETE FROM salespeople WHERE snum=${id}`;
        let res = await poolPromise.execute(sqlQuery);

        console.log(res)
    } catch (error) {
        console.log(error.message)
    }
}

const updateSalesPeople = async (data, id) => {
    try {
        // let sqlQuery = `UPDATE salespeople SET snum='?', sname='?', city='?', comm='?' WHERE snum=${id}`;
        // let res = poolPromise.execute(sqlQuery, [data.snum, data.sname, data.city, data.comm]);

        let sqlQuery = `UPDATE salespeople SET snum=?, sname=?', city='?', comm='?' WHERE snum=${id}`;
        console.log(sqlQuery)

        // console.log(res)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    insertProduct,
    SelectSalespeople,
    deleteSalesPeople,
    updateSalesPeople
}