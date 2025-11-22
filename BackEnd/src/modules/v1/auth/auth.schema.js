"use strict"

const Joi = require('joi')

module.exports.registerSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().max(24).min(8).pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')).required(),
})

module.exports.verifyIdSchema = Joi.object().keys({
    id: Joi.string().min(36).max(36).required(),
})