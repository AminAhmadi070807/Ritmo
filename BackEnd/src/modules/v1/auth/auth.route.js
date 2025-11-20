"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./auth.controller.js')
const validator = require('../../../middlewares/validate.middleware')

router.route('/otp-code/:id').get(controller.viewOtpCode)

router.route('/register')
    .get(controller.viewRegister)
    .post(validator.registerValidation, controller.send)

module.exports = router