"use strict"

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    music: {
        type: String,
        required: true,
        trim: true,
    },
    poster: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MusicAlbum',
    },
    tags: {
        type: [String],
        default: [],
        trim: true,
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'MusicGenre',
    },
    time: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Music", schema);