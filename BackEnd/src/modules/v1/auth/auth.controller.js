"use strict"

const userModel = require('../users/user.model')
const banModel = require('../ban/ban.model')
const redis = require('../../../database/Redis/db')
const sendEmail = require('../../../config/config.email')
const crypto = require('crypto')
const slugify = require('slugify')

const setRedisData = async (email, fullName) => {
    try {
        const random = crypto.randomInt(100000, 1000000)
        const randomId = crypto.randomUUID()
        fullName = slugify(fullName, { replacement: '-', trim: true, lower: true })
        await redis.set(randomId, `email:${email}-fullName:${fullName}-otp${random}`, 'EX', 180)
        return { status: 200, data: { email, fullName, random, randomId } }
    }
    catch (error) {
        return { status: 500, data: { error: error.message || "OoOps unknown server error"} }
    }
}

module.exports.viewRegister = (req, res ) => res.render('register.ejs')

module.exports.viewOtpCode = (req, res) => res.render('otp_code.ejs')

module.exports.send = async (req, res, next) => {
    try {
        const { email, fullName } = req.body;

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

        const resultSetRedisData = await setRedisData(email, fullName)

        if (resultSetRedisData.status !== 200) {
            req.flash("error", "There was a problem, please try again.")
            return res.redirect('/auth/register')
        }

        const sendEmailResult = await sendEmail(email, resultSetRedisData.data.random)

        if (sendEmailResult.status !== 200) {
            req.flash('error', sendEmailResult.message)
            return res.redirect('/auth/register')
        }

        return res.redirect(`/auth/otp-code/${resultSetRedisData.data.randomId}`)
    }
    catch(error) {
        next(error);
    }
}