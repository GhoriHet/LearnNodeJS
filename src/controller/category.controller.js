const Categories = require("../models/categories.model");

const createCategory = async (req, res) => {
    try {
        let category = await Categories.create(req.body);

        if (!category) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }

        return res.status(200).json({
            success: true,
            message: 'Category created successfully!',
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getCategory = async (req, res) => {
    try {
        let category = await Categories.find();

        if (!category) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category Data Get Successfully!!"
        })

    } catch (error) {
        console.log(error.message);
    }
}

const getCategoryById = async (req, res) => {
    try {
        let id = req.params.id;

        let category = await Categories.findById(id);

        if (!category) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

const updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        if (!id) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }

        let category = await Categories.findByIdAndUpdate(id, data, { new: true });

        if (!category) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully!',
        });

    } catch (error) {
        console.log(error.message);
    }
}

// const deleteCategoryData = async (req, res) => {
//     console.log(req.params.id)
//     // try {
//     //     const category = await Categories.findByIdAndDelete(req.params.id);

//     //     if (!category) {
//     //         return res.status(404).json({ success: false, message: 'Category not found' });
//     //     }

//     //     return res.status(200).json({ success: true, message: 'Category deleted successfully' });
//     // } catch (error) {
//     //     console.error(error.message);
//     //     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//     // }
// };

const getCategoryActive = async (req, res) => {
    try {
        let category = await Categories.aggregate([
            {
                $match: {
                    "isActive": true
                },
            },
            {
                $count: "Category Active Of"
            }
        ]);
        if (!category) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category Data Get Successfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }

}

const mostProduct = async (req, res) => {
    try {
        let category = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'category_id',
                        as: 'product'
                    }
                },
                {
                    $unwind: {
                        path: '$product'
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        category_name: { $first: '$category_name' },
                        'totalProduct': {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        totalProduct: -1
                    }
                },
                {
                    $limit: 5
                }
            ]
        );
        if (!category) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category Data Get Successfully!!"
        })

    } catch (error) {
        console.log(error.message)
    }
}

const averageProduct = async (req, res) => {
    try {
        const products = await Categories.aggregate(
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
            message: "Get average product category successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getCategoryInactive = async (req, res) => {
    try {
        let category = await Categories.aggregate([
            {
                $match: {
                    "isActive": false
                },
            },
            {
                $count: "Category Inactive Of"
            }
        ]);

        if (!category) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category Data Get Successfully!!"
        });

    } catch (error) {
        console.log(error.message)
    }
}

const countSubcategory = async (req, res) => {
    try {
        let category = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: 'subcategories',
                        localField: '_id',
                        foreignField: 'category_id',
                        as: 'result'
                    }
                },
                {
                    $unwind: {
                        path: '$result',
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        category_name: { $first: '$category_name' },
                        category_desc: { $first: '$category_desc' },
                        'TotalCounting': {
                            $sum: 1
                        }
                    }
                }
            ]
        );
        if (!category) {
            return res.status(500).json({ message: "Internal Server Error!" })
        }

        return res.status(400).json({
            success: true,
            data: category
        })

    } catch (error) {
        console.log(error.message)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Categories.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    // deleteCategoryData,
    getCategoryActive,
    mostProduct,
    averageProduct,
    getCategoryInactive,
    countSubcategory,
    deleteCategory
}