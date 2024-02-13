const Joi = require('joi');

const createCategory = {
    body: {
        category_name: Joi.string().required().trim(),
        category_desc: Joi.string().required().trim()
    },
    params: {
        id: Joi.number().required()
    }
};

module.exports = {
    createCategory
};