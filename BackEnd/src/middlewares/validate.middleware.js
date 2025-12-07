"use strict"

const { registerSchema, verifyIdSchema } = require('../modules/v1/auth/auth.schema')
const categorySchema = require('../modules/v1/musics/categories/category.schema')
const createMusicSchema = require('../modules/v1/musics/music/music.schema')
const genreSchema = require('../modules/v1/musics/genre/genre.schema')
const { createAlbumSchema } = require('../modules/v1/musics/album/album.schema')
const planSchema = require('../modules/v1/plan/plan.schema')

module.exports.authRegisterValidation = async (req, res, next) => {
    try {
        await registerSchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.authVerifyValidation = async (req, res, next) => {
    try {
        await verifyIdSchema.validateAsync({ ...req.params })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.categoryValidator = async (req, res, next) => {
    try {
        await categorySchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.createMusicValidator = async (req, res, next) => {
    try {
        await createMusicSchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.genreValidator = async (req, res, next) => {
    try {
        await genreSchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.createAlbumValidator = async (req, res, next) => {
    try {
        await createAlbumSchema.validateAsync({ ...req.body })

        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports.planValidator = async (req, res, next) => {
    try {
        await planSchema.validateAsync({ ...req.params })

        next()
    }
    catch (error) {
        next(error)
    }
}