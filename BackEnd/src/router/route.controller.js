"use strict"

const categoriesModel = require('../modules/v1/musics/genre/genre.model')
const albumModel = require('../modules/v1/musics/album/album.model')
const userModel = require('../modules/v1/users/user.model')
const musicModel = require('../modules/v1/musics/music/music.model')
const {isValidObjectId} = require("mongoose");
const response = require('../helpers/response.helper')

module.exports.music = (req, res) => res.render('music/index.ejs')

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
            musics
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

        const musics = await musicModel.find({ album: id }, "poster artist title").lean()

        return res.render('music/albumsDetail.ejs', {
            album,
            musics
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.musicPlaylists = async (req, res) => res.render('music/playlists.ejs')

module.exports.notFound = (req, res) => res.render('404.ejs')

module.exports.authentication = (req, res ) => res.render('auth.ejs')

module.exports.verify = (req, res, ) => res.render('verify.ejs')