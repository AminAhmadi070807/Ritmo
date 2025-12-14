"use strict";

const path = require("path");

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const passport = require('passport')

const errorHandler = require('./middlewares/error.middleware')
const notFoundHandler = require('./middlewares/notFound.middleware')
const googleStrategy = require('./strategies/google.strategy')

const headers = require('./middlewares/header.middleware')
const route = require('./router/route')
const authRouter = require('./modules/v1/auth/auth.route.js')
const usersRouter = require('./modules/v1/users/user.route')
const musicRouter = require('./modules/v1/musics/music/music.route')
const musicCategoriesRouter = require('./modules/v1/musics/genre/genre.route')
const categoriesMusicRouter = require('./modules/v1/musics/categories/category.route')
const musicAlbumRouter = require('./modules/v1/musics/album/album.route')
const musicPlaylistsRouter = require('./modules/v1/musics/playlists/playlist.route')
const musicLastHeardRouter = require('./modules/v1/last-heard/last-heard.route')
const musicLikeSongsRouter = require('./modules/v1/like-songs/like-song.route')
const musicDownloadRouter = require('./modules/v1/download/download.route')
const planRouter = require('./modules/v1/plan/plan.route')
const paymentRouter = require('./modules/v1/payment/payment.route')
const suggestionRouter = require('./modules/v1/suggestion/suggestion.route')
const faqRouter = require('./modules/v1/FAQ/faq.route')
const searchRouter = require('./modules/v1/search/search.route')

const app = express();

app.use(cookieParser());
app.use(helmet())
app.use(headers)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', '..', 'FrontEnd', "views"))
passport.use(googleStrategy)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/musics/genres', musicCategoriesRouter)
app.use('/api/v1/musics/albums', musicAlbumRouter)
app.use('/api/v1/musics/playlists', musicPlaylistsRouter)
app.use('/api/v1/categories/music', categoriesMusicRouter)
app.use('/api/v1/musics/lastHeard', musicLastHeardRouter)
app.use('/api/v1/musics/likeSongs', musicLikeSongsRouter)
app.use('/api/v1/musics/downloads', musicDownloadRouter)
app.use('/api/v1/musics', musicRouter)
app.use('/api/v1/plan', planRouter)
app.use('/api/v1/payment', paymentRouter)
app.use('/api/v1/suggestions', suggestionRouter)
app.use('/api/v1/FAQ', faqRouter)
app.use('/api/v1/search', searchRouter)

app.use(route)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app