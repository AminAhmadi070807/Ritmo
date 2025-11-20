"use strict"

const Joi = require('joi');

module.exports = async (err, req, res, next) => {
    try {
        if (Joi.isError(err)) {
            const details = err.details[0];
            req.flash('error', details.message.replace(/["'`]/g, ""))
            return res.redirect('/')
        }
        req.flash('error', err.status || 500, `${err.name} ${err.message || "OoOps unknown server error"}`)
        return res.redirect('/')
    }
    catch (err) {
        req.flash('error', err.status || 500, `${err.name} ${err.message || "OoOps unknown server error"}`)
        return res.redirect('/')
    }
}