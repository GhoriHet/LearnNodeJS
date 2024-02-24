const express = require("express");
const validate = require("../../middleware/validate");
const { categoryValidation } = require("../../validation");
const { categoryController } = require("../../controller");

const router = express.Router();

router.get(
    "/get-category",
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

router.delete(
    "delete-category/:id",
    categoryController.deleteCategory
)

router.get(
    "/get-active",
    categoryController.getCategoryActive
)

router.get(
    "/get-inactive",
    categoryController.getCategoryInactive
)

module.exports = router;