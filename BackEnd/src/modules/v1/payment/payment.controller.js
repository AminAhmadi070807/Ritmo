"use strict";

const paymentModel = require('./payment.model')
const planModel = require('../plan/plan.model')
const { isValidObjectId } = require("mongoose");
const response = require('../../../helpers/response.helper')
const zarinPalService = require('../../../services/payment.service')

module.exports.payment = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) return response(res, 400, "plan id is not correct.")

        const plan = await planModel.findById(id).lean()

        if (!plan) return response(res, 404, "plan not found")

        const paymentResult = await zarinPalService.payment(plan.price, `خرید پلن اختصاصی ریتمو به مدت ${plan.month} ماه`)

        if (paymentResult.status !== 200) return response(res, paymentResult.status, paymentResult.message)

        return response(res, 200, null, { ...paymentResult })
    }
    catch (error) {
        next(error);
    }
}