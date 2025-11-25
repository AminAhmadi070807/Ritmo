"use strict"

const express = require("express");
const multer = require("multer");
const diskStorage = require('../../../../utils/upload.util')

const router = express.Router();

const controller = require('./music.controller')
const validator = require('../../../../middlewares/validate.middleware')
const authGuard = require('../../../../middlewares/guard/auth.guard')

router.route('/').post(authGuard, validator.createMusicValidator, controller.create)

module.exports = router;