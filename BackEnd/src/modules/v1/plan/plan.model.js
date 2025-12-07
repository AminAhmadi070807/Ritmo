"use strict";

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    month: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Plan', schema);