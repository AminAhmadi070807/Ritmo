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
    category: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    album: {
        type: String,
        required: true,
        trim: true,
    },
    tags: {
        type: [{
            type: String,
            required: true,
            trim: true,
        }]
    },
    views: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("Music", schema);