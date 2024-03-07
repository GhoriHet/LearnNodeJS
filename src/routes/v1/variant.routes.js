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
);

router.get(
    '/get-product/:id',
    variantController.productData
);

router.get(
    '/list-variantProduct/:id',
    variantController.listVariantProductId
);

router.get(
    '/count-stock/:id',
    variantController.countStock
)

router.get(
    '/low-quantity',
    variantController.lowQuantity
)

router.get(
    '/highPrice',
    variantController.highPrice
)

router.get(
    '/variant-active',
    variantController.getActive
)

router.get(
    '/count-product',
    variantController.countProducts
)

router.get(
    '/multiple-product',
    variantController.multipleProduct
)

module.exports = router