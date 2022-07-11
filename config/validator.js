const joi = require("joi")

const validator = (req,res,next) => {
    const schema = joi.object({
        fullname: joi.string()
            .trim()
            .required(),
        email: joi.string()
            .email({minDomainSegments:2})
            .required()
            .messages({
                "string.email": '"mail": incorrect format'}),
        password: joi.string()
            .min(8)
            .max(40)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'
            }),
        country: joi.string()
            .trim()
            .required(),
        photo: joi.string()
            .trim()
            .required(),
        from: joi.string()
            .required()
    })
    const validation = schema.validate(req.body.userData, {abortEarly:false})
    if (validation.error) {
        return res.json({success: false, from: "validator", message: validation.error.details, test: validation})
    }
    next()
}
module.exports = validator