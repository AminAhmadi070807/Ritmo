"use strict"

const musicModel = require('./music.model')
const albumModel = require('../album/album.model')
const genreModel = require('../genre/genre.model')
const deleteFile = require('../../../../utils/delete.file')
const response = require('../../../../helpers/response.helper')
const {isValidObjectId} = require("mongoose");

const fileFormat = {
    "music": ["audio/mpeg", "audio/wav", "audio/x-wav", "audio/ogg", "audio/opus", "audio/mp4", "audio/x-m4a", "audio/flac"],
    "image": ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
}

const deleteFiles = async (routes) => {
    try {
        for (const route of routes) await deleteFile(route)

        return { status: 200, message: "success" }
    }
    catch (error) {
        return { status: 500, message: error.message };
    }
}

module.exports.create = async (req, res, next) => {
    try {
        const user = req.user;

        const { tags, album, artist, genre, title} = req.body;

        if (!isValidObjectId(genre)) return response(res, 400, "genre is not correct.")

        if (album !== undefined && !isValidObjectId(album)) return response(res, 400, "album is not correct.")

        const { music, poster } = req.files;

        if (!req.files || (!music && !poster)) return response(res, 400, "music and poster is required.")

        if (!music) {
            await deleteFiles(['BackEnd/public' + `/uploads/posters/${poster[0].filename}`])
            return response(res, 400, "music and poster is required.")
        }

        if (!poster) {
            await deleteFiles(['BackEnd/public' + `/uploads/musics/${music[0].filename}`])
            return response(res, 400, "music and poster is required.")
        }

        if (!fileFormat.music.includes(music[0].mimetype) || !fileFormat.image.includes(poster[0].mimetype)) {
            await deleteFiles(['BackEnd/public' + `/uploads/posters/${poster[0].filename}`, 'BackEnd/public' + `/uploads/musics/${music[0].filename}`])
            return response(res, 400, "music valid format (mpeg, wav, x-wav, ogg, opus, mp4, x-m4a, flac) && poster valid format (jpeg, jpg, png, webp, gif, svg+xml)")
        }

        const isExistAlbum = await albumModel.findById(album).lean()

        if (!isExistAlbum) {
            await deleteFiles(['BackEnd/public' + `/uploads/posters/${poster[0].filename}`, 'BackEnd/public' + `/uploads/musics/${music[0].filename}`])
            return response(res, 400, "album is not existed.")
        }

        const isExistCategory = await genreModel.findById(genre).lean()

        if (!isExistCategory) {
            await deleteFiles(['BackEnd/public' + `/uploads/posters/${poster[0].filename}`, 'BackEnd/public' + `/uploads/musics/${music[0].filename}`])
            return response(res, 400, "album is not existed.")
        }

        const musicResult = await musicModel.create({
            tags: tags.split(","),
            album,
            artist,
            genre,
            title,
            user: user.uuid,
            music: `/uploads/musics/${music[0].filename}`,
            poster: `/uploads/posters/${poster[0].filename}`,
        })

        if (album) {
            const result = await fetch(`${process.env.HREF}/api/v1/musics/albums/${musicResult._id}/${album}`)
            const data = await result.json()

            if (result.status !== 200) return response(result.status, result.status, data.message)
        }

        return response(res, 201, "created new music successfully.")
    }
    catch (error) {
        await deleteFiles(['BackEnd/public' + `/uploads/posters/${req.files.poster[0].filename}`, 'BackEnd/public' + `/uploads/musics/${req.files.music[0].filename}`])
        next(error)
    }
}

module.exports.remove = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        if (!isValidObjectId(id)) return response(res, 422, "id is not correct.")

        const music = await musicModel.findById(id).lean()

        if (!music) return response(res, 404, "music not found. or has already been removed")

        if (music.user.toString() !== user.uuid.toString()) return response(res, 403, "you cannot deleted this song.")

        await musicModel.findByIdAndDelete(id)

        await deleteFiles(['BackEnd/public' + music.poster, 'BackEnd/public' + music.music])

        return response(res, 200, "removed music successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.trendingMusic = async (req, res, next) => {
    try {
        let musics = await musicModel.find({ }).lean().sort({ _id: -1, views: -1 }).limit(15)

        return response(res, 200, null, musics)
    }
    catch (error) {
        next(error)
    }
}