"use strict";

const express = require("express");
const router = express.Router();

const controller = require("./faq.controller");
const validator = require('../../../middlewares/validate.middleware')
const authGuard = require('../../../middlewares/guard/auth.guard');
const roleGuard = require('../../../middlewares/guard/role.guard');

router.route('/').post(validator.faqQuestionValidator, controller.question).get(controller.AllFAQ)

router.route('/:id').put(authGuard, roleGuard("ADMIN"), validator.faqValidator, controller.answer).post(authGuard, roleGuard("ADMIN"), controller.FAQ)

module.exports = router;