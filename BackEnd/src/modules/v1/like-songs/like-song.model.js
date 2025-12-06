"use strict";

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    music: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('LikeSong', schema);