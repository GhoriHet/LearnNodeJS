const express = require("express");

const router = express.Router();

const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .required(),

    city: Joi.string()
        .alphanum()
        .required(),
})

router.get("/", () => {
    console.log("GET category API..");
})

router.post("/", (req, res) => {
    const bodyData = req.body
    console.log("POST category API..");

    let errorData = schema.validate({ name: bodyData["name"], city: bodyData["city"] })
    console.log(errorData);

    if (!errorData.error) {
        return res.status(200).json({
            success: true,
            data: bodyData,
            message: "Data post successfully!!"
        })
    }

    res.status(404).json({
        success: false,
        message: errorData
    })

})

module.exports = router;