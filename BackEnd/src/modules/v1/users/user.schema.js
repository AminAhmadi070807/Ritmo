"use strict"

const Joi = require('joi')

module.exports.update = Joi.object().keys({
    username: Joi.string().pattern(/^\S+$/).required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    bio: Joi.string().required(),
})