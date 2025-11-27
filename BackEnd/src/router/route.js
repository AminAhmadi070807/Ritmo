"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./route.controller')

const validator = require('../middlewares/validate.middleware')

router.get('/', controller.music)
router.get('/categories', controller.musicCategory)
router.get('/podcast', controller.podcast)
router.get('/404', controller.notFound)
router.get('/auth/send', controller.authentication)
router.get('/auth/verify/:id', validator.authVerifyValidation, controller.verify)

module.exports = router