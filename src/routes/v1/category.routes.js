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
    "/:id",
    validate(categoryValidation.createCategory),
    (req, res, next) => {
        let ID = req.params.id;
        console.log(ID);
    })

module.exports = router;