const Variants = require("../models/variants.model")

const getVariant = async (req, res) => {
    try {
        let variant = await Variants.find();

        if (!variant) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }
        return res.status(200).json({
            success: true,
            data: variant,
            message: "Variant Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const getVariantById = async (req, res) => {
    try {
        let variant = await Variants.findById(req.params.id);
        console.log(variant);

        if (!variant) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: variant,
            message: "Variant Data Get Successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

const updateVariant = async (req, res) => {
    console.log(req.params.id)
    try {
        let variant = await Variants.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(variant)
        if (!variant) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: variant,
            message: "Variant Updated Successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

const deleteVariant = async (req, res) => {
    try {
        let variant = await Variants.findByIdAndDelete(req.params.id);

        if (!variant) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: variant,
            message: "Variant Deleted Successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

const createVariant = async (req, res) => {
    try {
        const variant = await Variants.create(req.body);

        if (!variant) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }

        return res.status(200).json({
            success: true,
            data: variant,
            message: 'Create Variant Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

const variantHighPrice = async (req, res) => {
    try {
        let variant = await Variants.aggregate([
            {
                $match: {
                    price: {
                        $gt: 1000
                    }
                }
            },
            {
                $group: {
                    _id: "$products",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);
        console.log(variant)
    } catch (error) {
        console.log(error.message)
    }
}

const productData = async (req, res) => {
    try {
        let id = req.params.id;
        let convertId = +id;
        // $match: {
        //     products: convertId
        // }
        const variant = await Variants.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'result'
                }
            },
            {
                $unwind: {
                    path: '$result',
                }
            },
            {
                $match: {
                    product_id: convertId
                }
            },
            {
                $project: {
                    'result._id': 0,
                }
            }
        ]);

        if (!variant) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }
        return res.status(200).json({
            success: true,
            data: variant,
            message: "Variant of Product Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getVariant,
    createVariant,
    getVariantById,
    updateVariant,
    deleteVariant,
    variantHighPrice,
    productData
}