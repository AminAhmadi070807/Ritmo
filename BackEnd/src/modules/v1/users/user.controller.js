"use strict"

const response = require('../../../helpers/response.helper')
const refreshModel = require('../token/token.model')
const adminModel = require('../admins/admin.model')

module.exports.getMe = async (req, res, next) => {
    try {
        const user = req.user

        const role = await adminModel.findOne({ user: user.uuid })

        return response(res, 200, null, { fullName: user.fullName, profile: user.profile, role : role.role })
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