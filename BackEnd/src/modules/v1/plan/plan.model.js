"use strict";

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: [{
            type: String,
            required: true,
            trim: true,
        }],
    }
})

module.exports = mongoose.model('Plan', schema);