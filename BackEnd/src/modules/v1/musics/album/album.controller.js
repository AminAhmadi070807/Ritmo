"use strict"

const albumModel = require('./album.model')
const musicModel = require('../music/music.model')
const userModel = require('../../users/user.model')
const response = require('../../../../helpers/response.helper')
const deleteFile = require("../../../../utils/delete.file");
const {isValidObjectId} = require("mongoose");

const fileFormat = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"]

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

        console.log("USER")

        const isExistAlbum = await albumModel.findOne({ title: req.body.title.trim(), artist: user.uuid.toString() }).lean()

        if (isExistAlbum) return response(res, 409, 'Album with title already exists.')

        const cover = req.file

        if (!fileFormat.includes(cover.mimetype)) {
            await deleteFiles(['BackEnd/public' + `/uploads/albums/${cover.filename}`])
            return response(res, 400, "valid format (image/jpeg, image/jpg, image/png, image/webp, image/gif, image/svg+xml )")
        }

        console.log("USER")

        await albumModel.create({
            title: req.body.title,
            artist: user.uuid,
            cover: `/uploads/albums/${cover.filename}`
        })

        return response(res, 201, "created new album successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.remove = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, "album id is not correct")

        const album = await albumModel.findById(id).lean()

        if (!album) return response(res, 404, "album not found. or has already been removed")

        if (!user.role.includes("ADMIN") || (user.uuid.toString() !== album.artist)) return response(res, 400, "you not access to removed album")

        await albumModel.findByIdAndDelete(id).lean()

        await deleteFiles(['BackEnd/public' + album.cover])

        return response(res, 200, "deleted album successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.addMusic = async (req, res, next) => {
    try {
        const user = req.user;

        const { musicId, albumId } = req.params

        if (!isValidObjectId(musicId) || !isValidObjectId(albumId)) return response(res, 400, "musicId or albumId is not correct.")

        const isExistMusic = await musicModel.findById(musicId).lean()

        if (!isExistMusic) return response(res, 404, 'music not found. or has already been removed.')

        const isExistAlbum = await albumModel.findById(albumId)

        if (!isExistAlbum) return response(res, 404, "album not found. or has already been removed.")

        if (isExistAlbum.artist.toString() !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this album and music")

        if (user.uuid !== isExistAlbum.artist.toString() || user.uuid !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this api")

        const existMusic = isExistAlbum.musics.includes(musicId)

        if (existMusic) return response(res, 404, "music not found. or has already been removed.")

        await albumModel.findByIdAndUpdate(albumId, {
            $push: {
                musics: musicId,
            }
        })

        return response(res, 200, "add music to album successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.removeMusic = async (req, res, next) => {
    try {
        const user = req.user;

        const { musicId, albumId } = req.params

        if (!isValidObjectId(musicId) || !isValidObjectId(albumId)) return response(res, 400, "musicId or albumId is not correct.")

        const isExistMusic = await musicModel.findById(musicId).lean()

        if (!isExistMusic) return response(res, 404, 'music not found. or has already been removed.')

        const isExistAlbum = await albumModel.findById(albumId)

        if (!isExistAlbum) return response(res, 404, "album not found. or has already been removed.")

        if (isExistAlbum.artist.toString() !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this album and music")

        if (user.uuid !== isExistAlbum.artist.toString() || user.uuid !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this api")

        const existMusic = isExistAlbum.musics.includes(musicId)

        if (!existMusic) return response(res, 404, "music not found. or has already been removed.")

        await albumModel.findByIdAndUpdate(albumId, {
            $pull: {
                musics: musicId,
            }
        })

        return response(res, 200, "add music to album successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.albums = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status = "trending" } = req.query;

        let albums
        if (status === 'trending') albums = await albumModel.find({}).sort({ views: -1 }).limit(+page * +limit).lean()
        else if (status === 'latest') albums = await albumModel.find({}).sort({ _id: -1 }).limit(+page * +limit).lean()
        else if (status === "All") albums = await albumModel.find({}).sort({ _id: -1 }).limit(+page * +limit).lean()
        else return response(res, 400, "status must be (trending, latest, All).")

        const albumsArray = []

        for (const album of albums) {
            const user = await userModel.findOne({ uuid: album.artist, raw: true })

            albumsArray.push({
                ...album,
                artist: user.fullName
            })
        }

        return response(res, 200, null, { albums: albumsArray })
    }
    catch (error) {
        next(error)
    }
}

module.exports.album = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) return response(res, 400, 'album id is not correct')

        const album = await albumModel.findById(id).lean().populate('musics', 'title poster time artist music')

        return response(res, 200, null, { album })
    }
    catch (error) {
        next(error)
    }
}