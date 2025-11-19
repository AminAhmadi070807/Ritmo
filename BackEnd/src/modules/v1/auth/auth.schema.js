"use strict"

const Joi = require('joi')

module.exports.registerSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    fullName: Joi.string().max(50).required(),
})