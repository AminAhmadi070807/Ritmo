"use strict"

const userModel = require('../users/user.model')

module.exports.viewRegister = (req, res ) => res.render('register.ejs')

module.exports.register = async (req, res, next) => {
    try {

    }
    catch(error) {
        next(error);
    }
}