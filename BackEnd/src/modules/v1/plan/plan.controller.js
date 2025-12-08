"use strict"

const planModel = require('./plan.model')
const response = require('../../../helpers/response.helper')

module.exports.create = async (req, res, next) => {
    try {
        const { price, month, description } = req.body;

        await planModel.create({
            price,
            month,
            description
        })

        return response(res, 201, "created new plan successfully")
    }
    catch(error) {
        next(error)
    }
}