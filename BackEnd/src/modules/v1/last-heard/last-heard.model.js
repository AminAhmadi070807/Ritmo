"use strict";

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    },
    user: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Number,
        required: true,
        default: 0
    },
    percent: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100
    }
}, { timestamps: true });

module.exports = mongoose.model('LastHeard', schema);