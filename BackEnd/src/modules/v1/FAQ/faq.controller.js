"use strict"

const FAQModel = require('./faq.model')
const response = require('../../../helpers/response.helper')
const {isValidObjectId} = require("mongoose");
const sendEmail = require('../../../config/config.email')

module.exports.question = async (req, res, next) => {
    try {
        await FAQModel.create({...req.body, isFAQ: false})

        return response(res, 201, "saved question successfully")
    }
    catch (error) {
        next(error);
    }
}

module.exports.answer = async (req, res, next) => {
    try {
        const user = req.user
        const { answer } = req.body
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, 'answer id is not correct')

        const FAQ = await FAQModel.findByIdAndUpdate(id, {
            answer,
            userId: user.uuid,
            isAnswer: true
        })

        const sendEmailResult = await sendEmail(FAQ.email, answer, "FAQ")

        if (sendEmailResult.status !== 200) return  response(res, sendEmailResult.status, sendEmailResult.message)

        return response(res, 200, "answer to question successfully")
    }
    catch (error) {
        next(error);
    }
}

module.exports.FAQ = async (req, res, next) => {
    try {
        const { title, description } = req.body

        await FAQModel.create({ title, description, isFAQ: true })

        return response(res, 201, "add new faq successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.AllFAQ = async (req, res, next) => {
    try {
        const faqs = await FAQModel.find({ isFAQ: true }).lean()

        return response(res, 200, null, faqs)
    }
    catch(error) {
        next(error)
    }
}

module.exports.AllQuestion = async (req, res, next) => {
    try {
        const faqs = await FAQModel.find({ isFAQ: false }).lean()

        return response(res, 200, null, faqs)
    }
    catch (error) {
        next(error)
    }
}