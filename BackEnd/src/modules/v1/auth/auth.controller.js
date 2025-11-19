"use strict"

const userModel = require('../users/user.model')
const banModel = require('../ban/ban.model')
const redis = require('../../../database/Redis/db')
const response = require('../../../helpers/response.helper')

module.exports.viewRegister = (req, res ) => res.render('register.ejs')

module.exports.send = async (req, res, next) => {
    try {
        const { email, fullName } = req.body;

        const isExistEmail = await userModel.findOne({
            where: { email },
            raw: true,
        })

        if (isExistEmail) return response(req, res, 409, "email already exists", '/auth/register')

        const isExistBan = await banModel.findOne({
            where: { email },
            raw: true,
        })

        if (isExistBan) return response(req, res, 403, "this email has been banned", '/auth/register')



        return response(res, 200, "you have successfully registered", register)
    }
    catch(error) {
        next(error);
    }
}