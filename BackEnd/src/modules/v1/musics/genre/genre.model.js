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
}, { timestamps: true })

module.exports = mongoose.model("MusicGenre", schema);