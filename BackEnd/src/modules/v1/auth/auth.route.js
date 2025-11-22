"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./auth.controller.js')
const validator = require('../../../middlewares/validate.middleware')

router.route('/verify/:id').get(validator.authVerifyValidation, controller.viewOtpCode).post(controller.verify)

router.route('/register')
    .get(controller.viewRegister)
    .post(validator.authRegisterValidation, controller.send)

router.get('/refresh', controller.refresh)

module.exports = router