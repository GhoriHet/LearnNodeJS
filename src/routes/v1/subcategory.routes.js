const express = require('express');
const validate = require("../../middleware/validate");

const { subcategoryValidation } = require("../../validation");
const { subcategoryController } = require("../../controller");

const router = express.Router();

router.get(
    "/get-subcategory",
    subcategoryController.getSubcategory
);

router.get(
    "/get-subcategory/:id",
    subcategoryController.getSubcategoryById
)

router.post(
    "/create-subcategory",
    validate(subcategoryValidation.createSubcategory),
    subcategoryController.createSubcategory
)

router.delete(
    "/delete-subcategory/:id",
    subcategoryController.deleteSubCategory
)

router.put(
    "/update-subcategory/:id",
    validate(subcategoryValidation.updateSubcategory),
    subcategoryController.updateSubcategory
)

router.get(
    "/subcategory-active",
    subcategoryController.countActive
)

router.get(
    "/subcategory-inactive",
    subcategoryController.countInActive
)

router.get(
    '/get-countProduct',
    subcategoryController.countProduct
)

router.get(
    '/get-mostProduct',
    subcategoryController.mostProduct
)

module.exports = router;