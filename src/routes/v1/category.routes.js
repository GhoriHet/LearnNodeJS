const express = require("express");
const validate = require("../../middleware/validate");
const { categoryValidation } = require("../../validation");
const { categoryController } = require("../../controller");

const router = express.Router();

router.get(
    "/get-category",
    categoryController.getCategory
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

module.exports = router;