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
        if (!req.body.search) {
            return res.status(400).json({ message: "Search parameter is missing or null." });
        }
        let product = await Products.find({
            $text: {
                $search: req.body.search
            }
        })

        if (!product) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

const productByCategoryId = async (req, res) => {
    try {

        let product = await Products.find({ category_id: req.params.category_id})
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