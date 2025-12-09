"use strict"

const musicModel = require('../musics/music/music.model')
const likeModel = require('../like-songs/like-song.model')
const lastHeardModel = require('../last-heard/last-heard.model')
const response = require('../../../helpers/response.helper')
const likeSongModel = require("../like-songs/like-song.model");

module.exports = async (req, res, next) => {
    try {
        const user = req.user;

        const musics = await musicModel.find({}).sort({ createdAt: -1 }).lean()
        const userLikeMusics = await likeModel.find({ user: user.uuid }).lean().sort({ createdAt: -1 }).populate('music')
        const lastHeardMusics = await lastHeardModel.find({ user: user.uuid, percent: { $gte : 50 } }).sort({ createdAt: -1 }).lean().populate('music')

        const suggestionTagArray = []

        for (const likeMusic of userLikeMusics) {
            for (const tag of likeMusic.music.tags) {
                const existing = suggestionTagArray.find(t => Object.keys(t)[0] === tag.trim());

                if (!existing) {
                    suggestionTagArray.push({
                        [tag.trim()]: { score: 3, title: tag.trim() }
                    });
                }else existing[tag.trim()].score += 3;
            }
        }

        for (const lastHeard of lastHeardMusics) {
            for (const tag of lastHeard.music.tags) {
                const existing = suggestionTagArray.find(t => Object.keys(t)[0] === tag.trim());

                if (!existing) suggestionTagArray.push({
                        [tag.trim()] : { score: Math.ceil(lastHeard.numberOfPlay * lastHeard.percent / 100), title: tag.trim() }
                });
                else {
                    existing[tag.trim()].score += Math.ceil(lastHeard.numberOfPlay * lastHeard.percent / 100)
                }
            }
        }

        const suggestionSortArray = suggestionTagArray.sort((a, b) => {
            const scoreA = Object.values(a)[0].score;
            const scoreB = Object.values(b)[0].score;
            return scoreB - scoreA; // نزولی
        });

        const suggestionMap = {};
        suggestionSortArray.forEach(item => {
            const key = Object.keys(item)[0];
            suggestionMap[key] = item[key].score;
        });

        const suggestionArray = musics.sort((a, b) => {
            const scoreA = a.tags.reduce((sum, tag) => sum + (suggestionMap[tag.trim()] || 0), 0);
            const scoreB = b.tags.reduce((sum, tag) => sum + (suggestionMap[tag.trim()] || 0), 0);
            return scoreB - scoreA;
        });

        const count = suggestionArray.length

        const suggestionNewArray = []

        for (const music of suggestionArray) {
            const isLikeUserSong = await likeSongModel.findOne({ user: user.uuid, music: music._id }).lean()

            suggestionNewArray.push({
                ...music,
                likeMusic: !!isLikeUserSong
            })
        }

        return response(res, 200, null, { suggestions : suggestionNewArray, count })
    }
    catch (error) {
        next(error)
    }
}