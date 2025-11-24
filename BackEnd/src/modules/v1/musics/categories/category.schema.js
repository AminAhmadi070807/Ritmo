"use strict"

const Joi = require('joi')

module.exports = Joi.object().keys({
    title: Joi.string().max(50).required(),
    href: Joi.string().max(50).required(),
    icon: Joi.string().required(),
})