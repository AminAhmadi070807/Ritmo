"use strict";

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    role: [{
        type: String,
        required: true,
        enum: ['ADMIN', "CONTENT-MODERATOR", 'EDITOR', "INVESTOR", "USER"],
        default: 'USER'
    }],
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Admin", schema);