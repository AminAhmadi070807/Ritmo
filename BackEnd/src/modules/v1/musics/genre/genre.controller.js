"use strict"

const genreModel = require('./genre.model')
const deleteFile = require("../../../../utils/delete.file");
const response = require("../../../../helpers/response.helper");
const fileFormat = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"]

module.exports.create = async (req, res, next) => {
    try {
        const cover = req.file

        if (!fileFormat.includes(cover.mimetype)) {
            await deleteFile('BackEnd/public', `/uploads/genres/${cover.filename}`)
            return response(res, 400, "image valid format (jpeg, jpg, png, webp, gif, svg+xml)")
        }

        const isExistGenre = await genreModel.findOne({ title: req.body.title.trim() }).lean()

        if (isExistGenre) return response(res, 409, "Genre is already exists.")

        await genreModel.create({
            title: req.body.title.trim(),
            href: req.body.href.trim(),
            cover: '/uploads/genres/' + cover.filename
        })

        return response(res, 201, "Created new genre successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const genres = await genreModel.find({}, 'title cover href').lean()

        return response(res, 200,  null, genres)
    }
    catch (error) {
        next(error)
    }
}