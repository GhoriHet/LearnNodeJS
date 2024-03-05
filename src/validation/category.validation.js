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
    params: {
        id: Joi.number().required()
    },
    body: {
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        image: Joi.string().trim(),
    }
}

module.exports = {
    createCategory,
    updateCategory
};