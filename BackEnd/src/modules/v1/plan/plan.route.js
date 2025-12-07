"use strict";

const express = require('express');
const router = express.Router();

const controller = require('./plan.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')
const roleGuard = require('../../../middlewares/guard/role.guard')

module.exports = router;