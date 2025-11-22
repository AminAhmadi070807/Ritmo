"use strict"

const Joi = require('joi');

const response = require('../helpers/response.helper')

module.exports = async (err, req, res, next) => {
    try {
        if (Joi.isError(err)) return response(res, 400, err.details[0].message.replace(/["'`]/g, ""))
        return response(res, err.status || 500, `${err.name} ${err.message || "OoOps unknown server error"}`)
    }
    catch (err) {
        return response(res, err.status || 500, `${err.name} ${err.message || "OoOps unknown server error"}`)
    }
}