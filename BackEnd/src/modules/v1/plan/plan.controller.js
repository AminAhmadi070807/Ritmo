"use strict"

const planModel = require('./plan.model')
const response = require('../../../helpers/response.helper')
const {isValidObjectId} = require("mongoose");

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

module.exports.getAll = async (req, res, next) => {
    try {
        const plans = await planModel.find({}).lean()

        return response(res, 200, null, { plans })
    }
    catch (error) {
        next(error)
    }
}

module.exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, "plan id is not correct.")

        const plan = await planModel.findByIdAndDelete(id).lean()

        if (!plan) return response(res, 404, "plan not found")

        return response(res, 204)
    }
    catch (error) {
        next(error)
    }
}