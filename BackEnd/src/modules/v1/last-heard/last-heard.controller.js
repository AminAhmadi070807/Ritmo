"use strict"

const lastHeardModel = require('./last-heard.model')
const musicModel = require('../musics/music/music.model')
const {isValidObjectId} = require("mongoose");
const response = require('../../../helpers/response.helper')

module.exports.add = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { time } = req.body;

        if (!isNaN(time)) return response(res, 400, "time is not type of number")

        if (!isValidObjectId(id)) return response(res, 400, 'music id is not correct.')

        const isExistMusic = await musicModel.findById(id).lean()

        if (!isExistMusic) return response(res, 400, 'music not found. or has already been removed.')

        await lastHeardModel.findOneAndUpdate({
            user: user.uuid,
            music: id
        }, {
            user: user.uuid,
            time,
            music: id
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