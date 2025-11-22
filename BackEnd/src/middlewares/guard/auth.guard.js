"use strict"

const jwt = require("jsonwebtoken")
const refreshTokenModel = require("../../modules/v1/token/token.model")
const userModel = require('../../modules/v1/users/user.model')
const configs = require('../../config/config.env')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
    try {
        const { 'access-token': accessToken, 'refresh-token': refreshToken } = await req.cookies

        if (!accessToken || !refreshToken) return res.redirect('/auth/login')

        const verifyToken = await jwt.verify(accessToken, configs.auth.accessSecretKey)

        const user = await userModel.findOne({ _id: verifyToken._id }).lean()

        if (!user) return res.redirect('/auth/login')

        const isExistToken = await refreshTokenModel.findOne({ user: user._id }).lean()

        if (!isExistToken) return res.redirect('/auth/login')

        const isExpiredToken = await bcrypt.compare(refreshToken, isExistToken.token)

        if (!isExpiredToken) return res.redirect('/auth/login')

        req.user = user
        next()
    }
    catch (error) {
        next(error)
    }
}