"use strict"

const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('./auth.controller.js')
const validator = require('../../../middlewares/validate.middleware')

router.post('/verify/:id', controller.verify)

router.route('/send').post(validator.authRegisterValidation, controller.send)

router.get('/refresh', controller.refresh)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get('/google/callback', passport.authenticate('google', { session: false }), controller.googleVerify)

module.exports = router