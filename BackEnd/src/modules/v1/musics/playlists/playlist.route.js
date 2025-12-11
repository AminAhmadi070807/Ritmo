"use strict"

const express = require("express");
const router = express.Router();

const multer = require("multer");
const diskStorage = require('../../../../utils/upload.util')

const upload = multer({ storage: diskStorage("playlists") })

const controller = require('./playlist.controller')

const validator = require('../../../../middlewares/validate.middleware')
const authGuard = require('../../../../middlewares/guard/auth.guard')
const roleGuard = require('../../../../middlewares/guard/role.guard')

router.route('/')
    .post(authGuard, roleGuard("ARTIST"), upload.single("cover"), validator.createAlbumValidator, controller.create)
    .get(controller.getAll)

router.route('/Me').get(authGuard, controller.userPlaylist)

router.route('/:musicId/:playlistId').put(authGuard, roleGuard("ARTIST"), controller.addMusic).delete(authGuard, roleGuard("ARTIST"), controller.removeMusic)

router.route('/:id').delete(authGuard, controller.remove).get(controller.playlist)


module.exports = router;