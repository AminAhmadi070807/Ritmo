"use strict"

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const configs = require('./../config/config.env')

module.exports = async (user_id) => {
    try {
        const refreshToken = await jwt.sign({ _id: user_id }, configs.auth.refreshSecretKey, { expiresIn: +configs.auth.refreshExpiresIn })
        const accessToken = await jwt.sign({ _id: user_id }, configs.auth.accessSecretKey, { expiresIn: +configs.auth.accessExpiresIn })

        const hashRefreshToken = await bcrypt.hashSync(refreshToken, 10)

        return { status: 200, refreshToken, accessToken, hashRefreshToken }
    }
    catch (error) {
        return { status: 500, message: "OoOps Unknown server error" }
    }
}