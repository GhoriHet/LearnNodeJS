const Variants = require("../models/variants.model")

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

const productData = async (req, res) => {
    try {
        let id = req.params.id;
        let convertId = +id;

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

const listVariantProductId = async (req, res) => {
    try {
        const productId = req.params.id;
        const convertId = +productId;

        const variants = await Variants.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $match: {
                        product_id: convertId
                    }
                },
                {
                    $group: {
                        _id: '$product_id',
                        product_name: {
                            $first: '$products.name'
                        },
                        variants: {
                            $push: '$attributes'
                        }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        );

        if (!variants) {
            return res.status(500).json({ message: "Internal Server Error!" })
        };

        return res.status(200).json({
            success: true,
            data: variants,
            message: "Variant of Product Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const countStock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const convertId = +stockId;

        const variant = await Variants.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $match: {
                        product_id: convertId
                    }
                },
                {
                    $group: {
                        _id: '$product_id',
                        product_name: {
                            $first: '$products.name'
                        },
                        stock: {
                            $sum: '$attributes.Quantity'
                        }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        );

        if (!variant) {
            return res.status(500).json({ message: "Internal Server Error!" })
        };

        return res.status(200).json({
            success: true,
            data: variant,
            message: "Variant of Product Stock Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const lowQuantity = async (req, res) => {
    try {
        const variants = await variants.aggregate(
            [
                {
                    $sort: {
                        'attributes.Quantity': 1
                    }
                },
                {
                    $limit: 1
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$products.name',
                        Quantity: '$attributes.Quantity'
                    }
                }
            ]
        );

        if (!variants) {
            return res.status(500).json({ message: "Internal Server Error!" })
        };

        return res.status(200).json({
            success: true,
            data: variants,
            message: "Variant of Product llow Quantity Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const highPrice = async (req, res) => {
    try {
        const variants = await Variants.aggregate(
            [
                {
                    $sort: {
                        'attributes.Price': -1
                    }
                },
                {
                    $limit: 1
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$products.name',
                        Price: '$attributes.Price'
                    }
                }
            ]
        );

        if (!variants) {
            return res.status(500).json({ message: "Internal Server Error!" })
        };

        return res.status(200).json({
            success: true,
            data: variants,
            message: "Variant of Product High Price Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const getActive = async (req, res) => {
    try {
        let variants = await Variants.aggregate([
            {
                $match: {
                    "isActive": true
                },
            }
        ]);

        if (!variants) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: variants,
            message: "Variant Active Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const countProducts = async (req, res) => {
    try {
        const variants = await Variants.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $group: {
                        _id: '$products._id',
                        product_name: {
                            $first: '$products.name'
                        },
                        total_variants: {
                            $sum: 1
                        }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        );

        if (!variants) {
            return res.status(500).json({ message: "Internal Server Error!" })
        };

        return res.status(200).json({
            success: true,
            data: variants,
            message: "Variant of Count-Product Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const multipleProduct = async (req, res) => {
    try {
        const variant = await Variants.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product_id',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $unwind: {
                        path: '$products'
                    }
                },
                {
                    $group: {
                        _id: '$product_id',
                        product_name: {
                            $first: '$products.name'
                        },
                        total_attributes: {
                            $sum: 1
                        },
                        attributes: {
                            $push: '$attributes'
                        }
                    }
                },
                {
                    $match: {
                        total_attributes: { $gt: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
        );

        if (!variant) {
            return res.status(500).json({message: 'Internal server error'});
        }

        return res.status(200).json({
            success: true,
            data: variant,
            message: 'Multiple Product Data Get Successfully!!'
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
    productData,
    listVariantProductId,
    countStock,
    lowQuantity,
    highPrice,
    getActive,
    countProducts,
    multipleProduct
}