"use strict"

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    cover: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true,
        trim: true
    },
    musics: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Music",
            required: true,
        }],
    },
    views: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("MusicPlaylist", schema)