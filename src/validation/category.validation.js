const Joi = require('joi');

const createCategory = {
    body: {
        _id: Joi.number().required(),
        category_name: Joi.string().required().trim(),
        category_desc: Joi.string().required().trim(),
        // image: Joi.string().required().trim(),
    }
};

const updateCategory = {
    body: {
        category_name: Joi.string().trim(),
        category_desc: Joi.string().trim(),
        // image: Joi.string().trim(),
    }
}

// const deleteCategory = {
//     params: {
//         id: Joi.number().required()
//     }
// };

module.exports = {
    createCategory,
    updateCategory,
    // deleteCategory
};