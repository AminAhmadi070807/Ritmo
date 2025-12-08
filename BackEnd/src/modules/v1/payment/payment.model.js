"use strict";

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
        required: true,
        enum: ["PLAN"]
    },
    objectID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
}, {timestamp: true})

module.exports = mongoose.model('Payment', schema);