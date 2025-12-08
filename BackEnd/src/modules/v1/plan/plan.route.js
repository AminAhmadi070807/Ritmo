"use strict";

const express = require('express');
const router = express.Router();

const controller = require('./plan.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')
const roleGuard = require('../../../middlewares/guard/role.guard')
const validator = require('../../../middlewares/validate.middleware')

router.route('/').post(authGuard, roleGuard("ADMIN"), validator.planValidator , controller.create).get(controller.getAll)

router.route('/:id').delete(authGuard, roleGuard("ADMIN"), validator.planValidator, controller.remove)

module.exports = router;