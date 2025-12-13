"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./route.controller')
const authGuard = require('../middlewares/guard/auth.guard')

const validator = require('../middlewares/validate.middleware')

router.get('/', controller.music)
router.get('/plan', controller.plan)
router.get('/categories', controller.musicCategory)
router.get('/albums', controller.musicAlbums)
router.get('/albums/details/:id', controller.musicAlbumDetails)
router.get('/playlists/details/:id', controller.musicPlaylistsDetails)
router.get('/playlists', controller.musicPlaylists)
router.get('/lastHeard', controller.lastHeard)
router.get('/likeSongs', controller.likeSongs)
router.get('/downloads', controller.downloads)
router.get('/suggestions', controller.suggestions)
router.get('/404', controller.notFound)
router.get('/auth/send', controller.authentication)
router.get('/auth/verify/:id', validator.authVerifyValidation, controller.verify)
router.get('/categories/details/:id', controller.musicCategoryDetails)
router.get('/settings/profile', controller.profile)
router.get('/settings/channel', controller.channel)
router.get('/FAQ', controller.FAQ)
router.get('/music/create',authGuard, controller.createMusic)
router.get('/playlist/create',authGuard, controller.createPlaylist)
router.get('/album/create',authGuard, controller.createAlbum)
router.get('/settings/setting/profile', controller.settingProfile)

module.exports = router