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

        const verifyToken = await jwt.verify(accessToken, configs.auth.accessSecretKey)

        const user = await userModel.findOne({ _id: verifyToken._id }).lean()

        if (!user) return response(res, 401, "Please log in first. the token has expires.")

        const isExistToken = await refreshTokenModel.findOne({ user: user._id }).lean()

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