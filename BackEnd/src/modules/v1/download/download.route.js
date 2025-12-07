"use strict"

const express = require("express");
const router = express.Router();

const controller = require('./last-heard.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')

router.route('/:id').post(authGuard, controller.add)

router.route('/').get(authGuard, controller.lastHeardUser)

module.exports = router;