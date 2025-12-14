"use strict";

const musicModel = require('../musics/music/music.model')
const response = require('../../../helpers/response.helper')

module.exports = async (req, res, next) => {
    try {
        const search = req.query.search.trim();

        const keyword = search.split(" ")[0];

        const musics = await musicModel.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } },
                { artist: { $regex: keyword, $options: "i" } },
            ]
        });

        return response(res, 200, null, musics)
    }
    catch (error) {
        next(error);
    }
}