"use strict"

const Joi = require('joi');
const response = require('../helpers/response.helper')

module.exports = async (err, req, res, next) => {
    try {
        return response(res, 400, err)
    }
    catch (err) {
        return response(res, err.status || 500, err.message || "OoOps unKnown server error")
    }
}