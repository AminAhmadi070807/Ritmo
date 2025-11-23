"use strict"

const response = require('../../../helpers/response.helper')
const refreshModel = require('../token/token.model')

module.exports.getMe = async (req, res, next) => {
    try {
        const user = req.user

        return response(res, 200, null, user)
    }
    catch (error) {
        next(error)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const user = req.user

        await refreshModel.deleteOne({ user: user.uuid }).lean()

        return res.redirect('/')
    }
    catch (error) {
        next(error)
    }
}