"use strict";

const Joi = require('joi');
const {isValidObjectId} = require("mongoose");

module.exports.createAlbumSchema = Joi.object().keys({
    title: Joi.string().required(),
})