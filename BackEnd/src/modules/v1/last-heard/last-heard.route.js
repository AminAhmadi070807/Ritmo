"use strict"

const express = require("express");
const router = express.Router();

const controller = require('./last-heard.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')


module.exports = router;