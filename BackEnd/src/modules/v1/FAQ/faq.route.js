"use strict";

const express = require("express");
const router = express.Router();

const controller = require("./faq.controller");
const authGuard = require('../../../middlewares/guard/auth.guard');
const roleGuard = require('../../../middlewares/guard/role.guard');

router.route('/').post(controller.question)

module.exports = router;