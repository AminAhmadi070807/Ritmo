"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./category.controller')

const validator = require('../../../../middlewares/validate.middleware')
const authGuard = require('../../../../middlewares/guard/auth.guard')
const roleGuard = require('../../../../middlewares/guard/role.guard')

router.route('/')
    .post(authGuard, roleGuard("ADMIN"), validator.categoryValidator, controller.create)
    .get(controller.getAll)

router.route('/:id').delete(authGuard, roleGuard("ADMIN"), controller.remove)

module.exports = router