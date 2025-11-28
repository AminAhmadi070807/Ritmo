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

        if (isExistAlbum) return response(res, 409, 'Album with title already exists.')

        const cover = req.file

        if (!fileFormat.includes(cover.mimetype)) {
            await deleteFiles(['BackEnd/public' + `/uploads/albums/${cover.filename}`])
            return response(res, 400, "valid format (image/jpeg, image/jpg, image/png, image/webp, image/gif, image/svg+xml )")
        }

        await playlistModel.create({
            title: req.body.title,
            artist: user.uuid,
            cover: `/uploads/playlists/${cover.filename}`
        })

        return response(res, 201, "created new album successfully.")
    }
    catch (error) {
        next(error)
    }
}