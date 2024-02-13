const express = require("express");
const validate = require("../../middleware/validate");
const { categoryValidation } = require("../../validation");

const router = express.Router();

router.get("/", () => {
    console.log("GET category API..");
})

router.post(
    "/",
    validate(categoryValidation.createCategory),
    (req, res, next) => {
        console.log(req.body);
        res.status(200).json({
            success: true,
            data: req.body,
            message: "Data post successfully!!"
        })
    })

router.put(
    "/:id",
    validate(categoryValidation.createCategory),
    (req, res, next) => {
        let ID = req.params.id;
        console.log(ID);
    })

module.exports = router;