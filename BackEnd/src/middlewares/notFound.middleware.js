"use strict"

const response = require('../helpers/response.helper')

module.exports = async (req, res, next) => {
    try {
        return response(res, 404, "This api is not found")
    }
    catch (err) {
        next(err);
    }
}