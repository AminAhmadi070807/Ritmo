"use strict"

const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().required(),
    href: Joi.string().required(),
})