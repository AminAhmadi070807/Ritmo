"use strict";

const Joi = require('joi');
const {isValidObjectId} = require("mongoose");

module.exports = Joi.object().keys({
    music: Joi.string().custom((value, helpers) => {
        if (!isValidObjectId(value)) return helpers.messages("music id is not correct.")

        return value
    }).required(),
    title: Joi.string().required(),
})