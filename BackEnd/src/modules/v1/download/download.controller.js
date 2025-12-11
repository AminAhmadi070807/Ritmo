"use strict"

const downloadModel = require('./download.model')
const musicModel = require('../musics/music/music.model')
const userPlan = require('../plan/user.plan.model')
const likeSongModel = require('../like-songs/like-song.model')
const {isValidObjectId} = require("mongoose");
const response = require('../../../helpers/response.helper')

module.exports.download = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params

        if (!isValidObjectId(id)) return response(res, 400, 'music id is not correct')

        const isExistMusic = await musicModel.findById(id).lean()

        if (!isExistMusic) return response(res, 404, 'music not found. or has already been removed.')

        const isExistUserPlan = await userPlan.findOne({ user: user.uuid })

        if (!isExistUserPlan) return response(res, 400, "you do not have access to download music.")

        const isExistMusicLike = await downloadModel.findOne({ user: user.uuid, music: id }).lean()

        if (isExistMusicLike) return response(res, 409, 'music already downloaded successfully')

        await downloadModel.create({
            user: user.uuid,
            music: id,
        })

        return response(res, 201, 'music downloaded successfully')
    }
    catch (error) {
        next(error)
    }
}

module.exports.userDownloads = async (req, res, next) => {
    try {
        const { limit = 100, page = 1 } = req.query;

        const user = req.user;

        const numberOfUserDownloads = await downloadModel.countDocuments({})

        const downloads = await downloadModel.find({user: user.uuid}, 'music').limit(+page * +limit).lean().sort({ updatedAt: -1 }).populate('music')

        const downloadArray = []

        for (const download of downloads) {
            const likeSong = await likeSongModel.findOne({ music: download.music }).lean()
            console.log(download._id)
            downloadArray.push({
                ...download,
                likeSong: !!(likeSong),
            })
        }

        return response(res, 200, null, { downloads: downloadArray, count: numberOfUserDownloads });
    }
    catch (error) {
        next(error)
    }
}