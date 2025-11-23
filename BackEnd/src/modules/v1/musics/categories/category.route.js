"use strict"

const express = require('express')
const router = express.Router()
const multer = require('multer')
const disStorage = require('../../../../utils/upload.util')

const controller = require('./category.controller')

const validator = require('../../../../middlewares/validate.middleware')
const authGuard = require('../../../../middlewares/guard/auth.guard')

const upload = multer({ storage: disStorage('icons'), limits: { fileSize: 5 * 1024 * 1024 } })

router.route('/').post(authGuard, upload.single('icon'), validator.categoryValidator, controller.create)

module.exports = router