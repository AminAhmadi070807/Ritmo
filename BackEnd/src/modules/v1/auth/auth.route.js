"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./auth.controller.js')

router.route('/register').get(controller.viewRegister)

module.exports = router