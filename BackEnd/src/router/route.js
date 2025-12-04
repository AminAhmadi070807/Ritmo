"use strict"

const express = require('express')
const router = express.Router()

const controller = require('./route.controller')

const validator = require('../middlewares/validate.middleware')

router.get('/', controller.music)
router.get('/categories', controller.musicCategory)
router.get('/albums', controller.musicAlbums)
router.get('/albums/details/:id', controller.musicAlbumDetails)
router.get('/playlists/details/:id', controller.musicPlaylistsDetails)
router.get('/playlists', controller.musicPlaylists)
router.get('/404', controller.notFound)
router.get('/auth/send', controller.authentication)
router.get('/auth/verify/:id', validator.authVerifyValidation, controller.verify)
router.get('/categories/details/:id', controller.musicCategoryDetails)

module.exports = router