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

})

module.exports = router;