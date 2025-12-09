"use strict";

const express = require("express");
const router = express.Router();

const controller = require('./suggestion.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')

module.exports = router;