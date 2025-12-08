"use strict"

const express = require("express");
const router = express.Router();

const controller = require('./payment.controller')

const authGuard = require('../../../middlewares/guard/auth.guard')

router.route('/plan/:id').post(authGuard, controller.payment)

router.route('/plan/verify').get(authGuard, controller.verify)

module.exports = router;