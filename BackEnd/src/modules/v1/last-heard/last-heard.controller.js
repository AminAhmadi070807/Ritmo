"use strict"

const lastHeardModel = require('./last-heard.model')
const musicModel = require('../musics/music/music.model')
const {isValidObjectId} = require("mongoose");
const response = require('../../../helpers/response.helper')

module.exports.create = async (req, res, next) => {
    try {
        const user = req.user;
        const { id } = req.params;

        if (!isValidObjectId(id)) return response(res, 400, 'music id is not correct.')

        const isExistMusic = await musicModel.findById(id).lean()

        if (!isExistMusic) return response(res, 400, 'music not found. or has already been removed.')

        await lastHeardModel.create({
            user: user.uuid,
            music: id
        })
    }
    catch (error) {
        next(error)
    }
}