"use strict"

const lastHeardModel = require('./last-heard.model')
const musicModel = require('../musics/music/music.model')
const likeSongModel = require('../like-songs/like-song.model')
const {isValidObjectId} = require("mongoose");
const response = require('../../../helpers/response.helper')

module.exports.add = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { time} = req.body;

        if (isNaN(time)) return response(res, 400, "time is not type of number")

        if (!isValidObjectId(id)) return response(res, 400, 'music id is not correct.')

        const isExistMusic = await musicModel.findById(id).lean()

        if (!isExistMusic) return response(res, 400, 'music not found. or has already been removed.')

        await lastHeardModel.findOneAndUpdate({
            user: user.uuid,
            music: id
        }, {
            $set: {
                user: user.uuid,
                music: id,
            },
            $max: {
                time: time,
                percent: Math.floor((time / isExistMusic.time) * 100),
            },
        }, {
            new: true,
            upsert: true
        })

        return response(res, 201, "successfully added music to last heard")
    }
    catch (error) {
        next(error)
    }
}

module.exports.lastHeardUser = async (req, res, next) => {
    try {
        const { limit = 100, page = 1 } = req.query;

        const user = req.user;

        const lastHeards = await lastHeardModel.find({user: user.uuid}, 'music').limit(+page * +limit).lean().sort({ updatedAt: -1 }).populate('music')

        const lastHeardArray = []

        for (const lastHeard of lastHeards) {
            const isLikeUserSong = await likeSongModel.findOne({ user: user.uuid, music: lastHeard.music._id }).lean()

            lastHeardArray.push({
                ...lastHeard,
                likeMusic: !!isLikeUserSong
            })
        }

        return response(res, 200, null, { lastHeard: lastHeardArray });
    }
    catch (error) {
        next(error)
    }
}