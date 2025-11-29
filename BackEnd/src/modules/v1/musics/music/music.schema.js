"use strict"

const Joi = require('joi');
const {isValidObjectId} = require("mongoose");

module.exports = Joi.object().keys({
    tags: Joi.string().required(),
    album: Joi.string().custom((value, helpers) => {
        if (value === 'none') return value
        if (!isValidObjectId(value)) return helpers.message("category id is not correct")
        return value
    }).optional(),
    artist: Joi.string().required(),
    genre: Joi.string().custom((value, helpers) => {
        if (!isValidObjectId(value)) return helpers.message("category id is not correct")
        return value
    }).required(),
    title: Joi.string().required(),
})