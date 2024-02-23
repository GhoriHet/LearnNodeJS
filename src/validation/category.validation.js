const Joi = require('joi');

const createCategory = {
    body: {
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        image: Joi.string().required().trim(),
    }
};

const updateCategory = {
    params: {
        id: Joi.string().required().trim()
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