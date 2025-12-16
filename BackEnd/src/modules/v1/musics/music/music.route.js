"use strict"

const express = require("express");
const multer = require("multer");
const diskStorage = require('../../../../utils/upload.util')

const router = express.Router();

const controller = require('./music.controller')
const validator = require('../../../../middlewares/validate.middleware')
const roleGuard = require('../../../../middlewares/guard/role.guard')
const authGuard = require('../../../../middlewares/guard/auth.guard')

const upload = multer({ storage: diskStorage('music'), limits: { fileSize: 1024 * 1024 * 100 } });

router.route('/')
    .post(authGuard, upload.fields([{ name: 'music', maxCount: 1 }, { name: 'poster', maxCount: 1 }]), validator.createMusicValidator, controller.create)
    .get(controller.musics)

router.get('/trending', controller.trendingMusic)

router.route('/:id').delete(authGuard, roleGuard(["ADMIN"]), controller.remove).get(controller.music)

module.exports = router;