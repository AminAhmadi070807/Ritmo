"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./route.controller')

const validator = require('../middlewares/validate.middleware')

router.get('/', controller.home)
router.route('/404', controller.notFound)
router.get('/auth/send', controller.authentication)
router.get('/auth/verify/:id', validator.authVerifyValidation, controller.verify)

module.exports = router