"use strict"

module.exports.create = async (req, res, next) => {
    try {
        const { channel, tags, album, artist, category } = req.body


    }
    catch (error) {
        next(error)
    }
}