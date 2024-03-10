const express = require('express');

const router = express.Router();

const categoryRoutes = require('./category.routes');
const subcategoryRoutes = require('./subcategory.routes');
const productRoutes = require('./product.routes');
const variantRoutes = require('./variant.routes');
const reviewRoutes = require('./review.routes');
const usersRoutes = require('./users.routes');

router.use('/category', categoryRoutes);
router.use('/subcategory', subcategoryRoutes);
router.use('/product', productRoutes);
router.use('/variant', variantRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', usersRoutes);

module.exports = router;