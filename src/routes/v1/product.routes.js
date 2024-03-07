const express = require('express')
const validate = require('../../middleware/validate')
const { productValidation } = require('../../validation')
const { productController } = require('../../controller')

const router = express.Router()

router.get(
    '/list-product',
    validate(productValidation.getProduct),
    productController.getProduct
)

router.get(
    '/get-product/:id',
    productController.getProductById
)

router.post(
    '/create-product',
    validate(productValidation.createProduct),
    productController.createProduct
)

router.put(
    '/update-product/:id',
    validate(productValidation.updateProduct),
    productController.updateProduct
)

router.delete(
    '/delete-product/:id',
    productController.deleteProduct
)

router.get(
    '/search-product',
    productController.productSearch
)

router.get(
    '/productCategoryId/:id',
    productController.productByCategoryId
)

module.exports = router