"use strict"

const FAQModel = require('./faq.model')
const response = require('../../../helpers/response.helper')


module.exports.question = async (req, res, next) => {
    try {
        await FAQModel.create({...req.body, isAnswer: false})

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
        const { answerId } = req.params

        await FAQModel.findByIdAndUpdate(answerId, {
            answer,
            userId: user.uuid,
            isAnswer: true
        })
    }
    catch (error) {
        next(error);
    }
}