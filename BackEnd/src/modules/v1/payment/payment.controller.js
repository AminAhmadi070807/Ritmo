"use strict";

const paymentModel = require('./payment.model')
const planModel = require('../plan/plan.model')
const { isValidObjectId } = require("mongoose");
const response = require('../../../helpers/response.helper')
const zarinPalService = require('../../../services/payment.service')

module.exports.payment = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        if (!isValidObjectId(id)) return response(res, 400, "plan id is not correct.")

        const plan = await planModel.findById(id).lean()

        if (!plan) return response(res, 404, "plan not found")

        const paymentResult = await zarinPalService.payment(plan.price, `خرید پلن اختصاصی ریتمو به مدت ${plan.month} ماه`)

        if (paymentResult.status !== 200) return response(res, paymentResult.status, paymentResult.message)

        await paymentModel.create({
            user: user.uuid,
            authority: paymentResult.authority,
            objectID: id,
            price: plan.price,
            model: "PLAN",
            status: false
        })

        return response(res, 200, null, { ...paymentResult })
    }
    catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports.verify = async (req, res, next) => {
    try {
        const user = req.user;

        const { Authority, Status } = req.query;

        if (Status !== "OK") return response(res, 400, "Payment is not successfully.")

        const isExistAuthority = await paymentModel.findOne({
            user: user.uuid,
            authority: Authority,
        }).lean()

        if (!isExistAuthority) return response(res, 404, "Payment not found.")

        const paymentVerify = await zarinPalService.verify(Authority, isExistAuthority.price)

        if (paymentVerify.status !== 200) return response(res, paymentVerify.status, paymentVerify.message)

        await paymentModel.findByIdAndUpdate(isExistAuthority._id, {
            $set: {
                status: true
            }
        })

        return response(res, 200, null, )
    }
    catch (error) {
        next(error);
    }
}