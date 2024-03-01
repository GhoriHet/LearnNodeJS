const Joi = require('joi');

const createSubcategory = {
    body: {
        category_id: Joi.number().required(),
        name: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        image: Joi.string().required().trim(),
    }
};

const getSubcategory = {
    body: Joi.object().keys()
}

const deleteSubcategory = {
    params: Joi.object().keys()
}

const updateSubcategory = {
    // params: joi.object().keys({ id: joi.number().integer() })
    params: Joi.object().keys()
}

module.exports = {
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategory
};