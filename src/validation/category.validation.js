const Joi = require('joi');

const createCategory = {
    body: {
        _id: Joi.number().required(),
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        image: Joi.string().required().trim(),
    }
};

const updateCategory = {
    body: {
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        image: Joi.string().trim(),
    }
}

const deleteCategory = {
    params: {
        categoryId: Joi.string().required().trim()
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
};