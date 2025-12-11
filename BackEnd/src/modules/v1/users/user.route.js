"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./user.controller')
const validator = require('../../../middlewares/validate.middleware')
const authGuard = require('../../../middlewares/guard/auth.guard')
const multer = require("multer");
const diskStorage = require("../../../utils/upload.util");

const upload = multer({ storage: diskStorage("profiles") })

router.post('/update', authGuard, upload.single('profile'), validator.userUpdateInfoValidator, controller.update)
router.get('/Me', authGuard, controller.getMe)
router.get('/logout', authGuard, controller.logout)

module.exports = router