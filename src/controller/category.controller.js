const Categories = require("../models/categories.model");

const createCategory = async (req, res) => {
    try {
        let category = await Categories.create(req.body)
        console.log(category);

        if (!category) {
            res.status(500).json({ message: 'Internal Server Error' })
        }

        res.status(200).json({
            success: true,
            message: 'Category created successfully!',
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getCategory = async (req, res) => {
    try {
        let category = await Categories.find()
        console.log(category);

        if (!category) {
            res.status(500).json({message: "Internal Server Error!"})
        }

        res.status(200).json({
            success: true,
            data: category,
            message: "Category Data Get Successfully!!"
        })
  
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createCategory,
    getCategory
}