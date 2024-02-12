const express = require('express');

const router = express.Router();

const categoryRoutes = require('./category.routes');
const subcategoryRoutes = require('./subcategory.routes');
const usersRoutes = require('./users.routes');

router.use('/category', categoryRoutes);
router.use('/subcategory', subcategoryRoutes);
router.use('/users', usersRoutes);

module.exports = router;