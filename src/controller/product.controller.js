// const Products = require("../models/products.model")

const { Products } = require("../models")

// const getProduct = async (req, res) => {
//     try {
//         let product = await Products.find()

//         if (!product) {
//             res.status(500).json({ message: "Internal Server Error!" })
//         }

//         res.status(200).json({
//             success: true,
//             data: product,
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const getProductById = async (req, res) => {
//     try {
//         let product = await Products.findById(req.params.id)

//         if (!product) {
//             res.status(500).json({ message: "Internal Server Error!" })
//         }

//         res.status(200).json({
//             success: true,
//             data: product,
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const createProduct = async (req, res) => {
//     try {
//         let product = await Products.create(req.body)

//         if (!product) {
//             res.status(500).json({ message: "Internal Server Error!" })
//         }

//         res.status(200).json({
//             success: true,
//             data: product,
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const updateProduct = async (req, res) => {
//     try {
//         let product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })

//         if (!product) {
//             res.status(500).json({ message: "Internal Server Error!" })
//         }

//         res.status(200).json({
//             success: true,
//             data: product,
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const deleteProduct = async (req, res) => {
//     try {
//         let product = await Products.findByIdAndDelete(req.params.id)

//         if (!product) {
//             res.status(500).json({ message: "Internal Server Error!" })
//         }

//         res.status(200).json({
//             success: true,
//             data: product,
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const productSearch = async (req, res) => {
//     try {
//         const { sortOrder = 1, rating, max, min = 0, category, page = 1, limit = 10 } = req.body

//         let matchMerge = {};

//         if (category) matchMerge.category_id = parseInt(category);

//         if (rating) matchMerge.AverageOfProducts = { $gte: rating };

//         if (min !== undefined && max !== undefined) {
//             matchMerge['variants.attributes.Price'] = { $gte: min, $lte: max };
//         } else if (max !== undefined) {
//             matchMerge['variants.attributes.Price'] = { $lte: max }
//         }

//         const pipeline = [
//             {
//                 $lookup: {
//                     from: 'reviews',
//                     localField: '_id',
//                     foreignField: 'product_id',
//                     as: 'reviews'
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'variants',
//                     localField: '_id',
//                     foreignField: 'product_id',
//                     as: 'variants'
//                 }
//             },
//             {
//                 $addFields: {
//                     'AverageOfProducts': { $avg: '$reviews.rating' }
//                 }
//             },
//             {
//                 $match: matchMerge
//             },
//             {
//                 $skip: (page - 1) * limit
//             },
//             {
//                 $limit: limit
//             },
//             {
//                 $sort: {
//                     'variants.attributes.Price': sortOrder
//                 }
//             }
//         ];

//         const products = await Products.aggregate(pipeline);

//         if (!products) {
//             res.status(500).json({ message: "Internal Server Error!" })
//         }
//         res.status(200).json({
//             success: true,
//             data: products,
//         });

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// const searchProductName = async (req, res) => {
//     try {
//         let productName = req.params.name;

//         let products = await Products.aggregate(
//             [
//                 {
//                     $match: {
//                         name: { $eq: productName }
//                     }
//                 }
//             ]
//         );

//         if (!products) {
//             return res.status(500).json({ message: "Internal Server Error!" });
//         }

//         res.status(200).json({
//             success: true,
//             data: products,
//             message: 'Get name by product successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const listByCategory = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const convertId = + categoryId;

//         let products = await Products.aggregate(
//             [
//                 {
//                     $match: {
//                         category_id: convertId
//                     }
//                 }
//             ]
//         );

//         if (!products) {
//             return res.status(500).json({ message: 'Internal Server Error.' })
//         }

//         res.status(200).json({
//             success: true,
//             data: products,
//             message: 'Get list by category successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const listBySubcategory = async (req, res) => {
//     try {
//         let subcategoryId = req.params.id;
//         let convertId = + subcategoryId;

//         let products = await Products.aggregate(
//             [
//                 {
//                     $match: {
//                         subcategory_id: convertId
//                     }
//                 }
//             ]
//         );

//         if (!products) {
//             return res.status(500).json({ message: 'Internal Server Error.' })
//         }

//         res.status(200).json({
//             success: true,
//             data: products,
//             message: 'Get list by subcategory successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const variantDetails = async (req, res) => {
//     try {
//         let productId = req.params.id;
//         let convertId = + productId;

//         const product = await Products.aggregate(
//             [
//                 {
//                     $match: {
//                         _id: convertId
//                     }
//                 },
//                 {
//                     $lookup: {
//                         from: 'variants',
//                         localField: '_id',
//                         foreignField: 'product_id',
//                         as: 'variants'
//                     }
//                 },
//                 {
//                     $unwind: {
//                         path: '$variants'
//                     }
//                 },
//                 {
//                     $project: {
//                         'variants.product_id': 0
//                     }
//                 }
//             ]
//         );

//         if (!product) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         };

//         res.status(200).json({
//             success: true,
//             data: product,
//             message: 'Get variant details successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const topReviews = async (req, res) => {
//     try {
//         let product = await Products.aggregate(
//             [
//                 {
//                     $lookup: {
//                         from: 'reviews',
//                         localField: '_id',
//                         foreignField: 'product_id',
//                         as: 'reviews'
//                     }
//                 },
//                 {
//                     $unwind: {
//                         path: '$reviews'
//                     }
//                 },
//                 {
//                     $sort: {
//                         'reviews.rating': -1
//                     }
//                 },
//                 {
//                     $limit: 2
//                 },
//                 {
//                     $group: {
//                         _id: '$_id',
//                         product_name: {
//                             $first: '$name'
//                         },
//                         rating: {
//                             $first: '$reviews.rating'
//                         }
//                     }
//                 }
//             ]
//         );

//         if (!product) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         };

//         res.status(200).json({
//             success: true,
//             data: product,
//             message: 'Get top reviews successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const newArrivals = async (req, res) => {
//     try {
//         const product = await Products.aggregate(
//             [
//                 {
//                     $sort: {
//                         _id: -1
//                     }
//                 },
//                 {
//                     $limit: 1
//                 }
//             ]
//         );

//         if (!product) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         };

//         res.status(200).json({
//             success: true,
//             data: product,
//             message: 'Get new arrivals successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const discount = async (req, res) => {
//     try {
//         const product = await Products.aggregate(
//             [
//                 {
//                     $lookup: {
//                         from: 'variants',
//                         localField: '_id',
//                         foreignField: 'product_id',
//                         as: 'variants'
//                     }
//                 },
//                 {
//                     $unwind: {
//                         path: '$variants'
//                     }
//                 }
//             ]
//         );
//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const outOfStock = async (req, res) => {
//     try {
//         const product = await Products.aggregate(
//             [
//                 {
//                     $lookup: {
//                         from: 'variants',
//                         localField: '_id',
//                         foreignField: 'product_id',
//                         as: 'variants'
//                     }
//                 },
//                 {
//                     $match: {
//                         variants: []
//                     }
//                 }
//             ]
//         );

//         if (!product) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         };

//         res.status(200).json({
//             success: true,
//             data: product,
//             message: 'Get out of stock products successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// const countCategories = async (req, res) => {
//     try {
//         const product = await Products.aggregate(
//             [
//                 {
//                     $group: {
//                         _id: '$category_id',
//                         product_name: {
//                             $first: '$name'
//                         },
//                         'totalProducts': {
//                             $sum: 1
//                         }
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 0
//                     }
//                 }
//             ]
//         );

//         if (!product) {
//             return res.status(500).json({ message: 'Internal Server Error' });
//         };

//         res.status(200).json({
//             success: true,
//             data: product,
//             message: 'Get count categories successfully'
//         });

//     } catch (error) {
//         console.log(error.message)
//     }
// }

// module.exports = {
//     createProduct,
//     getProduct,
//     getProductById,
//     updateProduct,
//     deleteProduct,
//     searchProductName,
//     productSearch,
//     listByCategory,
//     listBySubcategory,
//     variantDetails,
//     topReviews,
//     newArrivals,
//     discount,
//     outOfStock,
//     countCategories,
// }

const createProduct = async (req, res) => {
    try {
        const result = await Products.insertProduct(req.body);

        res.status(200).json({
            success: true,
            message: 'Data Insert Successfully.',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: Insert Salespeople",
            data: []
        })
    }
}

const getSalespeople = async (req, res) => {
    try {
        const result = await Products.SelectSalespeople();

        res.status(200).json({
            success: true,
            message: 'Data Get Successfully.',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: Get Salespeople",
            data: []
        })
    }
}

const deleteSalespeople = async (req, res) => {
    try {
        let deleteData = +req.params.id
        let result = await Products.deleteSalesPeople(deleteData);

        res.status(200).json({
            success: true,
            message: 'Data Delete Successfully.',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: Delete Salespeople",
            data: []
        })
    }
}

const updateSalespeople = async (req, res) => {
    try {
        let updateId = +req.params.id
        let updateData = req.body

        let result = await Products.updateSalesPeople(updateData, updateId);

        res.status(200).json({
            success: true,
            message: 'Data Update Successfully.',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: Updated Salespeople",
            data: []
        })
    }
}

module.exports = {
    createProduct,
    getSalespeople,
    deleteSalespeople,
    updateSalespeople
}