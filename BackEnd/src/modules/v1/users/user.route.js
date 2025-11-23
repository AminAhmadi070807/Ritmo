"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./user.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')

router.get('/Me', authGuard, controller.getMe)
router.get('/logout', authGuard, controller.logout)

module.exports = router