"use strict"

const { registerSchema } = require('../modules/v1/auth/auth.schema')

module.exports.registerValidation = async (req, res, next) => {
    try {
        await registerSchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}