"use strict";

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    }
})

schema.index({ expireAt: -1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('UserPlan', schema);