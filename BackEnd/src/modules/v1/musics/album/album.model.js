"use strict"

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artistID: {
        type: String,
        required: true,
        trim: true
    },
    cover: {
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
    }
}, { timestamps: true })

module.exports = mongoose.model("Album", schema)