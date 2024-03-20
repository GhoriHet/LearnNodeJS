const express = require("express");
const validate = require("../../middleware/validate");
const { categoryValidation } = require("../../validation");
const { categoryController } = require("../../controller");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.get(
    "/list-category",
    auth(["users", "admin"]),
    categoryController.getCategory
)

router.get(
    "/get-category/:id",
    categoryController.getCategoryById
)

router.post(
    "/create-category",
    validate(categoryValidation.createCategory),
    categoryController.createCategory
)

router.put(
    "/update-category/:id",
    validate(categoryValidation.updateCategory),
    categoryController.updateCategory
)

// router.delete(
//     "delete-category/:id",
//     // validate(categoryValidation.deleteCategory),
//     categoryController.deleteData
// )

router.delete(
    "/deleteCategory/:id",
    categoryController.deleteCategory
);


router.get(
    "/get-active",
    categoryController.getCategoryActive
)

router.get(
    "/get-inactive",
    categoryController.getCategoryInactive
)

router.get(
    '/get-mostProduct',
    categoryController.mostProduct
)

router.get(
    '/get-avgProduct',
    categoryController.averageProduct
)

router.get(
    '/get-countSubcategory',
    categoryController.countSubcategory
)

module.exports = router;