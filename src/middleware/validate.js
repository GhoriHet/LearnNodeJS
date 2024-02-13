const pick = require("../utils/pick");
const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    // console.log(Object.keys(schema)) //[ 'body' ]
    // console.log(schema); //Body Object
    // console.log("---------------------------------");
    // console.log(req);
    const object = pick(req, Object.keys(schema));
    // console.log(object); // { body: { category_name: 'hh', category_desc: 'dfddfdf' } }

    const { error, value } = Joi.compile(schema)
        .prefs({
            abortEarly: false
        })
        .validate(object)

    if (error) {
        let message = error.details.map((value) => value.message).join(",")
        return res.status(400).json({
            success: false,
            message: "Validation required message: " + message
        })
    }
    
    Object.assign(req, value);
    return next();
}

module.exports = validate;