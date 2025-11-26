"use strict";

const Joi = require('joi');

module.exports = Joi.object().keys({
    title: {
        type: String,
    }
})