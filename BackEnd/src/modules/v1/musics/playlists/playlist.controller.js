"use strict"

const playlistModel = require('./playlist.model')
const response = require('../../../../helpers/response.helper')
const deleteFile = require("../../../../utils/delete.file");
const {isValidObjectId} = require("mongoose");
const musicModel = require("../music/music.model");

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

        const isExistAlbum = await playlistModel.findOne({ title: req.body.title.trim(), user: user.uuid.toString() }).lean()

        if (isExistAlbum) return response(res, 409, 'playlists with title already exists.')

        const cover = req.file

        if (!fileFormat.includes(cover.mimetype)) {
            await deleteFiles(['BackEnd/public' + `/uploads/playlists/${cover.filename}`])
            return response(res, 400, "valid format (image/jpeg, image/jpg, image/png, image/webp, image/gif, image/svg+xml )")
        }

        await playlistModel.create({
            title: req.body.title,
            user: user.uuid,
            cover: `/uploads/playlists/${cover.filename}`
        })

        return res.redirect(`/albums/details/${album._id}`)
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, status = "trending" } = req.query

        let playlist
        if (status === 'trending') playlist = await playlistModel.find({}).sort({ views: -1, _id: -1 }).limit(+page * +limit).lean()
        else if (status === 'latest') playlist = await playlistModel.find({}).sort({ _id: -1 }).limit(+page * +limit).lean()
        else if (status === "All") playlist = await playlistModel.find({}).sort({ _id: -1 }).limit(+page * +limit).lean()
        else return response(res, 400, "status must be (trending, latest, All).")

        return response(res, 200, null, { playlist })
    }
    catch (error) {
        next(error)
    }
}

module.exports.remove = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, "playlist id is not correct.")

        const playlist = await playlistModel.findById(id).lean()

        if (!playlist) return response(res, 404, "playlist not found. or has already been removed.")

        if (!user.role.includes("ADMIN") || (user.uuid.toString() !== playlist.user)) return response(res, 400, "you not access to removed album.")

        await playlist.findByIdAndDelete(id).lean()

        await deleteFiles(['BackEnd/public' + playlist.cover])

        return response(res, 200, "deleted playlist successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.addMusic = async (req, res, next) => {
    try {
        const user = req.user;

        const { musicId, playlistId } = req.params

        if (!isValidObjectId(musicId) || !isValidObjectId(playlistId)) return response(res, 400, "musicId or playlistId is not correct.")

        const isExistMusic = await musicModel.findById(musicId).lean()

        if (!isExistMusic) return response(res, 404, 'music not found. or has already been removed.')

        const isExistPlaylist = await playlistModel.findById(playlistId)

        if (!isExistPlaylist) return response(res, 404, "playlist not found. or has already been removed.")

        if (isExistPlaylist.user.toString() !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this playlist and music")

        if (user.uuid !== isExistPlaylist.user.toString() || user.uuid !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this api")

        const existMusic = isExistPlaylist.musics.includes(musicId)

        if (existMusic) return response(res, 404, "music not found. or has already been removed.")

        await playlistModel.findByIdAndUpdate(playlistId, {
            $push: {
                musics: musicId,
            }
        })

        return response(res, 200, "add music to playlist successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.playlist = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, "playlist id is not correct.")

        const playlist = await playlistModel.findById(id).lean().populate('musics')

        if (!playlist) return response(res, 404, "playlist with id not found.")

        return response(res, 200, null, { playlist })
    }
    catch (error) {
        next(error)
    }
}

module.exports.removeMusic = async (req, res, next) => {
    try {
        const user = req.user;

        const { musicId, playlistId } = req.params

        if (!isValidObjectId(musicId) || !isValidObjectId(playlistId)) return response(res, 400, "musicId or playlistId is not correct.")

        const isExistMusic = await musicModel.findById(musicId).lean()

        if (!isExistMusic) return response(res, 404, 'music not found. or has already been removed.')

        const isExistPlaylist = await playlistModel.findById(playlistId)

        if (!isExistPlaylist) return response(res, 404, "playlist not found. or has already been removed.")

        if (isExistPlaylist.user.toString() !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this playlist and music")

        if (user.uuid !== isExistPlaylist.user.toString() || user.uuid !== isExistMusic.user.toString()) return response(res, 403, "you do not access to this api")

        const existMusic = isExistPlaylist.musics.includes(musicId)

        if (!existMusic) return response(res, 404, "music not found. or has already been removed.")

        await playlistModel.findByIdAndUpdate(playlistId, {
            $pull: {
                musics: musicId,
            }
        })

        return response(res, 200, "remove music from playlist successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.userPlaylist = async (req, res, next) => {
    try {
        const user = req.user;

        const playlists = await playlistModel.find({ user: user.uuid }).lean()

        const count = await playlistModel.countDocuments({ user: user.uuid }).lean()

        return response(res, 200, null, { count, playlists })
    }
    catch (error) {
        next(error)
    }
}