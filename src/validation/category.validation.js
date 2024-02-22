const Joi = require('joi');

const createCategory = {
    body: {
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        image: Joi.string().required().trim(),
    }
};

module.exports = {
    createCategory
};