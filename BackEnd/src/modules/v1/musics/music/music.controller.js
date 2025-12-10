"use strict"

const mm = require('music-metadata')
const musicModel = require('./music.model')
const albumModel = require('../album/album.model')
const genreModel = require('../genre/genre.model')
const deleteFile = require('../../../../utils/delete.file')
const response = require('../../../../helpers/response.helper')
const {isValidObjectId} = require("mongoose");

const path = require("path");

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

        if (!isValidObjectId(genre) || !isValidObjectId(album)) return response(res, 400, "genre or album is not correct.")

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

        let isExistAlbum = await albumModel.findById(album).lean()

        if (!isExistAlbum) {
            await deleteFiles(['BackEnd/public' + `/uploads/posters/${poster[0].filename}`, 'BackEnd/public' + `/uploads/musics/${music[0].filename}`])
            return response(res, 400, "album is not existed.")
        }

        const isExistCategory = await genreModel.findById(genre).lean()

        if (!isExistCategory) {
            await deleteFiles(['BackEnd/public' + `/uploads/posters/${poster[0].filename}`, 'BackEnd/public' + `/uploads/musics/${music[0].filename}`])
            return response(res, 400, "album is not existed.")
        }

        const metadata = await mm.parseFile(path.join(__dirname, '..', '..', '..', '..', '..', 'public', 'uploads', 'musics', music[0].filename))

        const musicResult = await musicModel.create({
            tags: [...tags.split(",").trim()],
            album: album,
            artist,
            genre,
            title,
            time: +metadata.format.duration,
            user: user.uuid,
            music: `/uploads/musics/${music[0].filename}`,
            poster: `/uploads/posters/${poster[0].filename}`,
        })

        await albumModel.findByIdAndUpdate(isExistAlbum._id, { $push: { musics: musicResult._id, } })

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

module.exports.musics = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status = "trending", genre } = req.query

        if (!isValidObjectId(genre)) return response(res, 400, "genre is not correct.")

        let musics
        if (status === 'trending') musics = await musicModel.find({ genre }).sort({ views: -1, _id : -1 }).select('poster artist title').limit(+page * +limit).lean()
        else if (status === 'latest') musics = await musicModel.find({ genre }).sort({ _id: -1 }).select('poster artist title').limit(+page * +limit).lean()
        else if (status === "All") musics = await musicModel.find({ genre }).sort({ _id: -1 }).select('poster artist title').limit(+page * +limit).lean()
        else return response(res, 400, "status must be (trending, latest, All).")

        return response(res, 200, null, musics)
    }
    catch (error) {
        next(error)
    }
}

module.exports.music = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) return response(res, 400, "id is not correct.")

        const music = await musicModel.findById(id).lean()

        if (!music) return response(res, 404, "music not found.")

        return response(res, 200, null, music)
    }
    catch (error) {
        next(error)
    }
}