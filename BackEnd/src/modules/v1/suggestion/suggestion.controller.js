"use strict"

const musicModel = require('../musics/music/music.model')
const likeModel = require('../like-songs/like-song.model')
const lastHeardModel = require('../last-heard/last-heard.model')
const response = require('../../../helpers/response.helper')
const likeSongModel = require("../like-songs/like-song.model");

module.exports = async (req, res, next) => {
    try {
        const user = req.user;

        const userLikeMusics = await likeModel.find({ user: user.uuid }).lean().sort({ createdAt: -1 }).populate('music')
        const lastHeardMusics = await lastHeardModel.find({ user: user.uuid, numberOfPlay: 1 }).sort({ createdAt: -1 }).lean().populate('music')

        const suggestionTagArray = []

        for (const likeMusic of userLikeMusics) {
            for (const tag of likeMusic.music.tags) {
                const existing = suggestionTagArray.find(t => Object.keys(t)[0] === tag.trim());

                if (!existing) suggestionTagArray.push({[tag.trim()]: 3});
                else existing[tag.trim()] += 3;
            }
        }

        for (const lastHeard of lastHeardMusics) {
            for (const tag of lastHeard.music.tags) {
                const existing = suggestionTagArray.find(t => Object.keys(t)[0] === tag.trim());

                if (!existing) suggestionTagArray.push({[tag.trim()] : Math.ceil(lastHeard.numberOfPlay * lastHeard.percent / 100)});
                else existing[tag.trim()] += Math.ceil(lastHeard.numberOfPlay * lastHeard.percent / 100)
            }
        }

        const suggestionSortArray = suggestionTagArray.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);

        const suggestionTag = [];

        for (const tag in suggestionSortArray) if (tag < 3) suggestionTag.push(Object.keys(suggestionTagArray[tag])[0])

        const musics = await musicModel.find({ tags: { $in: suggestionTag } }).sort({ updatedAt: -1 }).lean();

        const musicsArray = []

        for (const music of musics) {
            const likeMusic = await likeSongModel.findById(music._id).lean()
            musicsArray.push({
                ...music,
                likeSong: !!(likeMusic)
            })
        }

        return response(res, 200, null, { suggestions : musicsArray, count: musics.length || 0 })
    }
    catch (error) {
        next(error)
    }
}