"use strict"

const likeSongModel = require('./like-song.model')
const musicModel = require('../musics/music/music.model')
const {isValidObjectId} = require("mongoose");
const response = require('../../../helpers/response.helper')

module.exports.toggleLike = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, 'music id is not correct')

        const isExistMusic = await musicModel.findById(id).lean()

        if (!isExistMusic) return response(res, 404, 'music not found. or has already been removed.')

        const isExistMusicLike = await likeSongModel.findOne({ user: user.uuid, music: id }).lean()

        if (isExistMusicLike) {
            await likeSongModel.findByIdAndDelete(isExistMusicLike._id)
            return response(res, 204, 'music dis liked successfully')
        }

        await likeSongModel.create({
            user: user.uuid,
            music: id,
        })

        return response(res, 201, 'music liked successfully')
    }
    catch (error) {
        next(error)
    }
}