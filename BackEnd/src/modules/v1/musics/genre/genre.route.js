"use strict";

const express = require('express');
const authGuard = require("../../../../middlewares/guard/auth.guard");
const roleGuard = require("../../../../middlewares/guard/role.guard");
const validator = require("../../../../middlewares/validate.middleware");
const controller = require("./genre.controller");

const router = express.Router();

// router.route('/')
    // .post(authGuard, roleGuard("ADMIN"), validator.categoryValidator, controller.create)
    // .get(controller.getAll)

// router.route('/:id').delete(authGuard, roleGuard("ADMIN"), controller.remove)

module.exports = router