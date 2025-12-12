"use strict"

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    isFAQ: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

module.exports = mongoose.model('FAQ', schema)