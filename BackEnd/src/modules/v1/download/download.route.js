"use strict"

const express = require("express");
const router = express.Router();

const controller = require('./download.controller')
const authGuard = require('../../../middlewares/guard/auth.guard')

router.route('/:id').post(authGuard, controller.download)

router.route('/').get(authGuard, controller.userDownloads)

module.exports = router;