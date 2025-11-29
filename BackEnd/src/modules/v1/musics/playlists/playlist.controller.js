"use strict"

const playlistModel = require('./playlist.model')
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