const Joi = require('joi');

const createProduct = {
    body: {
        _id: Joi.number().required(),
        category_id: Joi.number().required(),
        subcategory_id: Joi.number().required(),
        variant_id: Joi.number().required(),
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        // image: Joi.string().required().trim(),
    }
};

const getProduct = {
    body: Joi.object().keys()
}

const deleteProduct = {
    params: Joi.object().keys()
}

const updateProduct = {
    params: Joi.object().keys()
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct
}