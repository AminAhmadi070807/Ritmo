"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./auth.controller.js')
const validator = require('../../../middlewares/validate.middleware')

router.post('/verify/:id', controller.verify)

router.route('/send').post(validator.authRegisterValidation, controller.send)

router.get('/refresh', controller.refresh)

module.exports = router