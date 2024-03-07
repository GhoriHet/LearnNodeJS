const Subcategories = require("../models/subcategories.model");

const createSubcategory = async (req, res) => {
    try {
        let subcategory = await Subcategories.create(req.body);
        console.log(subcategory);

        if (!subcategory) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const getSubcategory = async (req, res) => {
    try {
        let subcategory = await Subcategories.find();

        if (!subcategory) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const getSubcategoryById = async (req, res) => {
    try {
        let subcategory = await Subcategories.findById(req.params.id);

        if (!subcategory) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
        })

    } catch (error) {
        console.log(error.message);
    }
}

const updateSubcategory = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        let subcategory = await Subcategories.findByIdAndUpdate(id, data, { new: true })

        if (!subcategory) {
            res.status(500).json({ message: "Internal Server Error!" })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
            message: "Data updated successfully!!"
        })

    } catch (error) {
        console.log(error.message);
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        let subcategory = await Subcategories.findByIdAndDelete(req.params.id);

        if (!subcategory) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "Subcategory deleted successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

const parentOfSubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const convertId = +subcategoryId;

        const subcategory = await Subcategories.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: {
                    path: "$result",
                }
            },
            {
                $match: {
                    _id: { $eq: convertId }
                }
            },
            {
                $project: {
                    _id: "$_id",
                    category_name: "$result.category_name",
                    subcategory_name: "$subcategory_name"
                }
            }
        ]);

        if (!subcategory) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "Subcategory Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const countActive = async (req, res) => {
    try {
        let subcategory = await Subcategories.aggregate([
            {
                $match: {
                    "isActive": true
                },
            },
            {
                $count: "Subategory Active Of"
            }
        ]);
        if (!subcategory) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "Subcategory Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const mostProduct = async (req, res) => {
    try {
        const subcategory = await Subcategories.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'subcategory_id',
                        as: 'result'
                    }
                },
                {
                    $unwind: {
                        path: '$result'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        'TotalCounting': { $sum: 1 },
                        product_name: { $push: '$result.name' },
                        subcategory_name: { $first: '$subcategory_name' },
                    }
                },
                {
                    $sort: {
                        'TotalCounting': -1
                    }
                }
            ]
        );
        if (!subcategory) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }
        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "Subcategory Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const averageProduct = async (req, res) => {
    try {
        const products = await Subcategories.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'category_id',
                        as: 'products'
                    }
                },
                {
                    $addFields: {
                        'countOfProducts': { $size: '$products' }
                    }
                },
                {
                    $match: {
                        'countOfProducts': { $gt: 0 }
                    }
                },
                {
                    $group: {
                        _id: null,
                        'totalProducts': {
                            $sum: '$countOfProducts'
                        },
                        data: { $push: '$$ROOT' }
                    }
                },
                {
                    $unwind: {
                        path: '$data'
                    }
                },
                {
                    $addFields: {
                        'Percentage':
                        {
                            $multiply: [{
                                $divide: ['$data.countOfProducts', '$totalProducts']
                            }, 100]
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category_id: '$data._id',
                        category_name: '$data.category_name',
                        products: '$data.products',
                        isActive: '$data.isActive',
                        totalProducts: 1,
                        Percentage: 1
                    }
                }
            ]
        )

        if (!products) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: products,
            message: "Subcategory Data Get Successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

const countInActive = async (req, res) => {
    try {
        let subcategory = await Subcategories.aggregate([
            {
                $match: {
                    "isActive": false
                },
            },
            {
                $count: "Subategory InActive Of"
            }
        ]);
        if (!subcategory) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "Subcategory Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const countProduct = async (req, res) => {
    try {
        const subcategory = await Subcategories.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'subcategory_id',
                        as: 'result'
                    }
                },
                {
                    $unwind: {
                        path: '$result'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        subcategory_name: { $first: '$subcategory_name' },
                        subcategory_desc: { $first: '$subcategory_desc' },
                        'TotalCounting': {
                            $sum: 1
                        }
                    }
                }
            ]
        )
        if (!subcategory) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }
        return res.status(200).json({
            success: true,
            data: subcategory,
            message: "Subcategory Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    createSubcategory,
    getSubcategory,
    getSubcategoryById,
    updateSubcategory,
    deleteSubCategory,
    parentOfSubcategory,
    countActive,
    mostProduct,
    averageProduct,
    countInActive,
    countProduct,
}