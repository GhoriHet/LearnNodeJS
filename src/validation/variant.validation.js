const Joi = require("joi");

const createVariant = {
    body: {
        _id: Joi.number().required(),
        product_id: Joi.number().required(),
        attributes: Joi.object().required(),
        isActive: Joi.boolean()
    }
};

const updateVariant = {
    params: Joi.object().keys()
}

const deleteVariant = {
    params: {
        id: Joi.number().required()
    }
};

module.exports = {
    createVariant,
    updateVariant,
    deleteVariant
};