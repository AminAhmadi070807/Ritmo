"use strict"

const express = require("express");
const multer = require("multer");
const diskStorage = require('../../../../utils/upload.util')

const router = express.Router();

const controller = require('./music.controller')
const validator = require('../../../../middlewares/validate.middleware')
const authGuard = require('../../../../middlewares/guard/auth.guard')

const upload = multer({ storage: diskStorage('music'), limits: { fileSize: 1024 * 1024 * 5 } });

router.route('/').post(authGuard, upload.fields([{ name: 'music', maxCount: 1 }, { name: 'poster', maxCount: 1 }]), validator.createMusicValidator, controller.create)

module.exports = router;