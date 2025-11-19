"use strict"

const Joi = require('joi');
const response = require('../helpers/response.helper')

module.exports = async (err, req, res, next) => {
    try {
        if (Joi.isError(err)) {
            const details = err.details[0];
            return response(res, 400, details.message.replace(/["'`]/g, ""))
        }

        return response(res, err.status || 500, `${err.name} ${err.message || "OoOps unknown server error"}`)
    }
    catch (err) {
        return response(res, err.status || 500, err.message || "OoOps unKnown server error")
    }
}