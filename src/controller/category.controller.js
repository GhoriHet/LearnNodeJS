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

const deleteCategory = async (req, res) => {
    try {
        let category = await Categories.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(500).json({ message: 'Internal Server Error' })
        }

        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully!',
        })

    } catch (error) {
        console.log(error.message);
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
        let category = await Categories.aggregate(
            [
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'category_id',
                        as: 'result'
                    }
                },

                {
                    $project: {
                        _id: 1,
                        category_name: 1,
                        category_desc: 1,
                        avgProduct: {
                        }
                    }
                }
            ]
        )
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

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    getCategoryActive,
    getCategoryInactive,
    deleteCategory,
    updateCategory,
    mostProduct,
    averageProduct,
    countSubcategory
}