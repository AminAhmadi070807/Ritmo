"use strict"

const adminModel = require('../../modules/v1/admins/admin.model')

const response = require('../../helpers/response.helper')

module.exports = (roles) => {
    return async (req, res, next) => {
        try {
            if (!Array.isArray(roles)) roles = [roles]

            const user = req.user;

            const admin = await adminModel.findOne({ user: user.uuid }).lean()

            if (!admin) return response(res, 403, "This api is protected. You do not have access to this api")

            for (const role of admin.role) if (role === "ADMIN" || roles.includes(role)) return next()

            return response(res, 403, "This api is protected. You do not have access to this api")
        }
        catch (error) {
            next(error)
        }
    }
}