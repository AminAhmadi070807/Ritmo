"use strict"

const musicModel = require('./music.model')

const fileFormat = {
    "music": ["audio/mpeg", "audio/wav", "audio/x-wav", "audio/ogg", "audio/opus", "audio/mp4", "audio/x-m4a", "audio/flac"],
    "image": ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
}

// todo validate channel
module.exports.create = async (req, res, next) => {
    try {
        const user = req.user;

        const { channel, tags, album, artist, category } = req.body;

        const { music, poster } = req.files;
    }
    catch (error) {
        next(error)
    }
}