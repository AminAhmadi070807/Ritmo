"use strict"

const musicModel = require('./music.model')

module.exports.create = async (req, res, next) => {
    try {
        const user = req.user;

        const { channel, tags, album, artist, category } = req.body;

        console.log(channel, tags, album, artist, category, user);
    }
    catch (error) {
        next(error)
    }
}