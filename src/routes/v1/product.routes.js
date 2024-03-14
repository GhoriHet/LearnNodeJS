// const express = require('express')
// const validate = require('../../middleware/validate')
// const { productValidation } = require('../../validation')
// const { productController } = require('../../controller')

// const router = express.Router()

// router.get(
//     '/list-product',
//     validate(productValidation.getProduct),
//     productController.getProduct
// )

// router.get(
//     '/get-product/:id',
//     productController.getProductById
// )

// router.post(
//     '/create-product',
//     validate(productValidation.createProduct),
//     productController.createProduct
// )

// router.put(
//     '/update-product/:id',
//     validate(productValidation.updateProduct),
//     productController.updateProduct
// )

// router.delete(
//     '/delete-product/:id',
//     productController.deleteProduct
// )

// router.get(
//     '/search-product',
//     productController.productSearch
// )

// router.get(
//     '/search-productName/:name',
//     productController.searchProductName
// )

// router.get(
//     '/list/category/:id',
//     productController.listByCategory
// )

// router.get(
//     '/list/subcategory/:id',
//     productController.listBySubcategory
// )

// router.get(
//     '/variant-detail/:id',
//     productController.variantDetails
// )

// router.get(
//     '/top-rated',
//     productController.topReviews
// )

// router.get(
//     '/new-arrivals',
//     productController.newArrivals
// )

// router.get(
//     '/discount',
//     productController.discount
// )

// router.get(
//     '/outOfStock',
//     productController.outOfStock
// )

// router.get(
//     '/count-category',
//     productController.countCategories
// )

// module.exports = router


const express = require('express')
const validate = require('../../middleware/validate')
// const { productValidation } = require('../../validation')
const { productController } = require('../../controller')

const router = express.Router()

router.post(
    '/create-salespeople',
    productController.createProduct
)

router.get(
    '/get-salespeople',
    productController.getSalespeople
)

router.delete(
    '/delete-salespeople/:id',
    productController.deleteSalespeople
)

router.put(
    '/update-salespeople/:id',
    productController.updateSalespeople
)

module.exports = router