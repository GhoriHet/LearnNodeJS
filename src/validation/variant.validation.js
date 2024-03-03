
const joi = require('joi')

const createVariant = {
    body: {
        color: joi.string().required(),
        size: joi.string().required(),
        price: joi.number().required(),
        stock: joi.number().required(),
    }
}

const getVariant = {
    body: joi.object().keys()
}

const deleteVariant = {
    params: joi.object().keys()
}

const updateVariant = {
    params: joi.object().keys()
}

module.exports = {
    createVariant,
    getVariant,
    deleteVariant,
    updateVariant
}