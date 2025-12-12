"use strict"

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    isAnswer: {
        type: Boolean,
        default: false,
        required: true,
    },
    answer: {
        type: String,
        required: false,
        trim: true,
    },
    userId: {
        type: String,
        required: false,
        trim: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('FAQ', schema)