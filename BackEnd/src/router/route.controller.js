"use strict"

const path = require('path');

module.exports.music = (req, res) => res.render('music/index.ejs')

module.exports.podcast = (req, res) => res.render('podcast/index.ejs')

module.exports.notFound = (req, res) => res.render('404.ejs')

module.exports.authentication = (req, res ) => res.render('auth.ejs')

module.exports.verify = (req, res, ) => res.render('verify.ejs')