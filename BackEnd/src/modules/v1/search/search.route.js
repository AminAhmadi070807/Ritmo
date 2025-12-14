"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./search.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')

router.get('/', authGuard, controller)

module.exports = router