const express = require('express')
const validate = require('../../middleware/validate')
const { variantValidation } = require('../../validation')
const { variantController } = require('../../controller')

const router = express.Router();

router.get(
    '/list-variant',
    variantController.getVariant
)

router.get(
    '/get-variant/:id',
    variantController.getVariantById
)

router.put(
    '/update-variant/:id',
    validate(variantValidation.updateVariant),
    variantController.updateVariant
)

router.delete(
    '/delete-variant/:id',
    variantController.deleteVariant
)

router.post(
    '/create-variant',
    validate(variantValidation.createVariant),
    variantController.createVariant
)

router.get(
    '/prouct-price',
    variantController.variantHighPrice
)

router.get(
    '/get-variantOfProduct/:id',
    variantController.productData
);

module.exports = router