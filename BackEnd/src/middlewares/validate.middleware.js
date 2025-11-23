"use strict"

const { registerSchema, verifyIdSchema } = require('../modules/v1/auth/auth.schema')
const categorySchema = require('../modules/v1/musics/categories/category.schema')


module.exports.authRegisterValidation = async (req, res, next) => {
    try {
        await registerSchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.authVerifyValidation = async (req, res, next) => {
    try {
        await verifyIdSchema.validateAsync({ ...req.params })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.categoryValidator = async (req, res, next) => {
    try {
        await categorySchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}