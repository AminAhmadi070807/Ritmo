"use strict"

const categoriesModel = require('../modules/v1/musics/genre/genre.model')
const albumModel = require('../modules/v1/musics/album/album.model')
const userModel = require('../modules/v1/users/user.model')
const musicModel = require('../modules/v1/musics/music/music.model')
const playlistModel = require('../modules/v1/musics/playlists/playlist.model')
const {isValidObjectId} = require("mongoose");
const response = require('../helpers/response.helper')

module.exports.music = (req, res) => res.render('music/index.ejs', { music: null })

module.exports.musicPage = async (req, res) => res.render('music/page.ejs')

module.exports.musicCategory = async (req, res) => res.render('music/categories.ejs')

module.exports.musicCategoryDetails = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, 'category id is not correct.')

        const category = await categoriesModel.findById(id).lean()

        if (!category) return response(res, 404, 'category not found. or has already been removed.')

        const musics = await musicModel.find({ genre: id }).sort({ _id: -1 }).lean()

        return res.render('music/categoryDetails.ejs', {
            category,
            musics,
            music: null
        })
    }
    catch (err) {
        next(err)
    }

}

module.exports.musicAlbums = async (req, res) => res.render('music/albums.ejs')

module.exports.musicAlbumDetails = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, 'category id is not correct.')

        let album = await albumModel.findById(id).lean()

        const user = await userModel.findOne({
            where: {
                uuid: album.artist,
            },
            raw: true
        })

        album.artist = user.fullName

        const musics = await musicModel.find({ album: id }, "poster artist title time updatedAt music").lean()

        let time = 0

        for (const music of musics) time += +music.time

        let now = ''

        if (time < 60) now = `ثانیه ${Math.floor(Math.floor(time))}`;
        else if (time > 60 && time < 3600) now = `${Math.floor(time / 60)} دقیقه`
        else if (time > 60 && time < 86400) now = `${Math.floor(time / 3600)} ساعت`

        await albumModel.findByIdAndUpdate(id, {$inc: {views: 1}})

        return res.render('music/albumsDetail.ejs', {
            album,
            musics,
            now,
            music: null
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.musicPlaylistsDetails = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, 'category id is not correct.')

        let playlist = await playlistModel.findById(id).populate("musics").lean()

        if (!playlist) return response(res, 404, "playlist not found")

        const user = await userModel.findOne({
            where: {
                uuid: playlist.user,
            },
            raw: true
        })

        playlist.user = user.fullName

        let time = 0

        for (const music of playlist.musics) time += +music.time

        let now = ''

        if (time < 60) now = `ثانیه ${Math.floor(time)}`;
        else if (time > 60 && time < 3600) now = `${Math.floor(time / 60)} دقیقه`
        else if (time > 60 && time < 86400) now = `${Math.floor(time / 3600)} ساعت`

        await playlistModel.findByIdAndUpdate(id, {$inc: {views: 1}})

        return res.render('music/playlistDetails.ejs', {
            now,
            playlist,
            music: null
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.musicPlaylists = async (req, res) => res.render('music/playlists.ejs')

module.exports.lastHeard = async (req, res) => res.render('music/lastHeard.ejs')

module.exports.notFound = (req, res) => res.render('404.ejs')

module.exports.authentication = (req, res ) => res.render('auth.ejs')

module.exports.verify = (req, res, ) => res.render('verify.ejs')