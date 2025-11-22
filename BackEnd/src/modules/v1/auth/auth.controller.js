"use strict"

const refreshTokenModel = require('../token/token.model')
const userModel = require('../users/user.model')
const banModel = require('../ban/ban.model')
const redis = require('../../../database/Redis/db')
const sendEmail = require('../../../config/config.email')
const crypto = require('crypto')
const tokenGenerator = require('../../../helpers/token.helper')
const jwt = require('jsonwebtoken')
const configs = require('../../../config/config.env')
const bcrypt = require('bcrypt')

const setRedisData = async (email, password) => {
    try {
        const random = crypto.randomInt(100000, 1000000)
        const randomId = crypto.randomUUID()
        await redis.set(randomId, `email:${email}-:-password:${password}-:-otp:${random}`, 'EX', 120)
        return { status: 200, data: { email, password, random, randomId } }
    }
    catch (error) {
        return { status: 500, data: { error: error.message || "OoOps unknown server error"} }
    }
}

const token = async (res, user_id) => {
    try {
        const { accessToken, refreshToken, status, hashRefreshToken } = await tokenGenerator(user_id)

        if (status !== 200) return { status, message: "Problem in generate token" }

        const isExistToken = await refreshTokenModel.findOneAndUpdate({ user: user_id }, {
            token: hashRefreshToken,
            user: user_id
        }).lean()

        if (!isExistToken) {
            await refreshTokenModel.create({
                token: hashRefreshToken,
                user: user_id,
            })
        }

        res.cookie('access-token', accessToken, { httpOnly: true, secure: true, maxAge: 15 * 60 * 1000 });
        res.cookie('refresh-token', refreshToken, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        return { status: 200 }
    }
    catch (error) {
        return { status: 500 , message: "OoOps Unknown server error" }
    }
}

module.exports.viewRegister = (req, res ) => res.render('register.ejs')

module.exports.viewOtpCode = async (req, res, ) => {
    try {
        const { id } = req.params

        const data = await redis.get(id)

        if (!data) {
            req.flash('error', "Please try again.")
            return res.redirect('/auth/register')
        }

        res.render('otp_code.ejs')
    }
    catch (error) {
        res.redirect('/')
    }
}

module.exports.send = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isExistEmail = await userModel.findOne({
            where: { email },
            raw: true,
        })

        if (isExistEmail) {
            req.flash('error', 'email already exists')
            return res.redirect('/auth/register')
        }

        const isExistBan = await banModel.findOne({
            where: { email },
            raw: true,
        })

        if (isExistBan) {
            req.flash('error', 'this email has been banned')
            return res.redirect('/auth/register')
        }

        const resultSetRedisData = await setRedisData(email, password)

        if (resultSetRedisData.status !== 200) {
            req.flash("error", "There was a problem, please try again.")
            return res.redirect('/auth/register')
        }

        const sendEmailResult = await sendEmail(email, resultSetRedisData.data.random)

        if (sendEmailResult.status !== 200) {
            req.flash('error', sendEmailResult.message)
            return res.redirect('/auth/register')
        }

        return res.redirect(`/auth/verify/${resultSetRedisData.data.randomId}`)
    }
    catch(error) {
        console.log(error)
        next(error);
    }
}

module.exports.verify = async (req, res, next) => {
    try {
        const { id } = req.params
        const { code } = req.body

        const data = await redis.get(id)

        if (!data) {
            req.flash('error', "Please try again.")
            return res.redirect('/auth/login')
        }

        const result = await data.split('-:-')

        const redisData = {}
        for (const key in result) {
            redisData[result[key].split(':')[0]] = result[key].split(':')[1]
        }

        if (redisData.otp !== code) {
            await redis.del(id)
            req.flash('error', "code in not correct. please try again.")
            return res.redirect('/auth/login')
        }

        const user = await userModel.create({
            ...redisData,
            otp: undefined,
            uuid: `${Date.now()}${crypto.randomUUID()}`,
            fullName: redisData.email.split('@')[1],
            username: redisData.email.split('@')[1]
        })

        const userDataValue = await user.dataValues

        const tokenResult = await token(res, userDataValue.uuid)

        if (tokenResult.status !== 200) {
            req.flash('error', "There was a problem. please try again.")
            return res.redirect('/auth/login')
        }

        return res.redirect('/')
    }
    catch (error) {
        next(error);
    }
}

module.exports.refresh = async (req, res, next) => {
    try {
        const { 'refresh-token': refreshToken } = req.cookies

        if (!refreshToken) return response(res, 401, "User not authorized")

        const userToken = await jwt.verify(refreshToken, configs.auth.refreshTokenSecretKey)

        const user = await refreshTokenModel.findOne({ user: userToken._id }).sort({ _id: -1 }).lean()

        if (!user) return response(res, 401, "user not authorized")

        const isBanned = await banModel.findOne({ phone: user.phone }).lean()

        if (isBanned) return response(res, 403, "user already banned.")

        const isExistToken = await bcrypt.compare(refreshToken, user.token)

        if (!isExistToken) return response(res, 409, "Refresh token is not acceptable")

        const { status, message } = await token(res, userToken._id)

        if (status !== 200) return response(res, status, message)

        return response(res, 200, "new token generated successfully.")
    }
    catch (error) {
        next(error)
    }
}