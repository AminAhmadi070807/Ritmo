"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./user.controller')
const validator = require('../../../middlewares/validate.middleware')
const authGuard = require('../../../middlewares/guard/auth.guard')

router.patch('/update', authGuard, controller.update)
router.get('/Me', authGuard, controller.getMe)
router.get('/logout', authGuard, controller.logout)

module.exports = router