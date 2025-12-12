"use strict";

const Joi = require('joi');

module.exports.question = Joi.object().keys({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    title: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
})

module.exports.FAQ = Joi.object().keys({
    title: Joi.string().max(50).required(),
    description: Joi.string().max(300).required(),
})