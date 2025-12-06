"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./like-song.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')

router.route('/:id').post(authGuard, controller.toggleLike)

module.exports = router