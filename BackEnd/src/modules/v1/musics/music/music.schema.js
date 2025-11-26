"use strict"

const Joi = require('joi');

module.exports = Joi.object().keys({
    tags: Joi.string().required(),
    album: Joi.string().required(),
    artist: Joi.string().required(),
    category: Joi.string().required(),
})