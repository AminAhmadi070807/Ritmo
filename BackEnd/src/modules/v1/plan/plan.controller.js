"use strict";

const Joi = require('joi')

module.exports = Joi.object().keys({
    price: Joi.number().integer().required(),
    month: Joi.number().integer().required(),
})