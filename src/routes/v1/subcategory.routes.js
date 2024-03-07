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

router.put(
    "/update-subcategory/:id",
    validate(subcategoryValidation.updateSubcategory),
    subcategoryController.updateSubcategory
)

router.delete(
    "/delete-subcategory/:id",
    subcategoryController.deleteSubCategory
)

router.get(
    '/get-parentOfsubcategory/:id',
    subcategoryController.parentOfSubcategory
)

router.get(
    "/subcategory-active",
    subcategoryController.countActive
)

router.get(
    '/get-mostProduct',
    subcategoryController.mostProduct
)

router.get(
    '/get-avgProduct',
    subcategoryController.averageProduct    
)

router.get(
    "/subcategory-inactive",
    subcategoryController.countInActive
)

router.get(
    '/get-countProduct',
    subcategoryController.countProduct
)

module.exports = router;