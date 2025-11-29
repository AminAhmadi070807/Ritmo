"use strict"

const playlistModel = require('./playlist.model')
const response = require('../../../../helpers/response.helper')
const deleteFile = require("../../../../utils/delete.file");

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

        return response(res, 201, "created new playlist successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const playlist = await playlistModel.find({}, "title cover").sort({ views: -1 }).limit(20).lean()

        return response(res, 200, null, { playlist })
    }
    catch (error) {
        next(error)
    }
}