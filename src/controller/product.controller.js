const Products = require("../models/products.model")

const getProduct = async (req, res) => {
    try {
        let product = await Products.find()

        if (!product) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: product,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const getProductById = async (req, res) => {
    try {
        let product = await Products.findById(req.params.id)

        if (!product) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: product,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const createProduct = async (req, res) => {
    try {
        let product = await Products.create(req.body)

        if (!product) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: product,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        let product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!product) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: product,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        let product = await Products.findByIdAndDelete(req.params.id)

        if (!product) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: product,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const productSearch = async (req, res) => {
    try {
        const { sortOrder = 1, rating, max, min = 0, category, page = 1, limit = 10 } = req.body

        let matchMerge = {};

        if (category) matchMerge.category_id = parseInt(category);

        if (rating) matchMerge.AverageOfProducts = { $gte: rating };

        if (min !== undefined && max !== undefined) {
            matchMerge['variants.attributes.Price'] = { $gte: min, $lte: max };
        } else if (max !== undefined) {
            matchMerge['variants.attributes.Price'] = { $lte: max }
        }

        // console.log(matchMerge)

        const pipeline = [
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'reviews'
                }
            },
            {
                $lookup: {
                    from: 'variants',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'variants'
                }
            },
            {
                $addFields: {
                    'AverageOfProducts': { $avg: '$reviews.rating' }
                }
            },
            {
                $match: matchMerge
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            },
            {
                $sort: {
                    'variants.attributes.Price': sortOrder
                }
            }
        ];

        const products = await Products.aggregate(pipeline);
        console.log(products)

        if (!products) {
            res.status(500).json({ message: "Internal Server Error!" })
        }
        res.status(200).json({
            success: true,
            data: products,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

const productByCategoryId = async (req, res) => {
    try {

        let product = await Products.find({ category_id: req.params.category_id })
        console.log(product)

        if (!product) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    productSearch,
    productByCategoryId
}