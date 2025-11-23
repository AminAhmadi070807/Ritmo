"use strict"

const jwt = require("jsonwebtoken")
const refreshTokenModel = require("../../modules/v1/token/token.model")
const userModel = require('../../modules/v1/users/user.model')
const configs = require('../../config/config.env')
const bcrypt = require('bcrypt')
const response = require('../../helpers/response.helper')

module.exports = async (req, res, next) => {
    try {
        const { 'access-token': accessToken, 'refresh-token': refreshToken } = await req.cookies

        if (!accessToken || !refreshToken) return response(res, 401, "access token has expired", {redirect: "/api/v1/auth/refresh"})

        let verifyToken
        try {
            verifyToken = await jwt.verify(accessToken, configs.auth.accessSecretKey)
        }
        catch (error) {
            if (error.name === "TokenExpiredError") return response(res, 401, "access token expired", { redirect: "/api/v1/auth/refresh" });

            return response(res, 401, "Invalid access token");
        }

        const user = await userModel.findOne({ where: { uuid: verifyToken._id }, raw: true })

        if (!user) return response(res, 401, "Please log in first. the token has expires.")

        const isExistToken = await refreshTokenModel.findOne({ user: user.uuid }).lean()

        if (!isExistToken) return response(res, 401, "Please log in first. the token has expired.")

        const isExpiredToken = await bcrypt.compare(refreshToken, isExistToken.token)

        if (!isExpiredToken) return response(res, 401, "Please log in first. the token has expired.")

        req.user = user

        next()
    }
    catch (error) {
        next(error)
    }
}