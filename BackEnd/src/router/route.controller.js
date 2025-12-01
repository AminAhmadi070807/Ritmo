"use strict"

module.exports.music = (req, res) => res.render('music/index.ejs')

module.exports.musicCategory = async (req, res) => res.render('music/categories.ejs')

module.exports.musicAlbums = async (req, res) => res.render('music/albums.ejs')

module.exports.notFound = (req, res) => res.render('404.ejs')

module.exports.authentication = (req, res ) => res.render('auth.ejs')

module.exports.verify = (req, res, ) => res.render('verify.ejs')