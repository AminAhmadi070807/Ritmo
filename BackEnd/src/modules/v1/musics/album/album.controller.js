"use strict"

const albumModel = require('./album.model')
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

        const isExistAlbum = await albumModel.findOne({ title: req.body.title.trim(), artist: user.uuid.toString() }).lean()

        if (isExistAlbum) return response(res, 409, 'Album with title already exists.')

        const cover = req.file

        if (!fileFormat.includes(cover.mimetype)) {
            await deleteFiles(['BackEnd/public' + `/uploads/albums/${cover.filename}`])
            return response(res, 400, "valid format (image/jpeg, image/jpg, image/png, image/webp, image/gif, image/svg+xml )")
        }

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

module.exports.getAll = async (req, res, next) => {
    try {
        const albums = await albumModel.find({}).sort({ views: -1 }).limit(20).lean()

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