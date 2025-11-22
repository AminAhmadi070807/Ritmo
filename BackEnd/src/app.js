"use strict";

const path = require("path");

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser');

const errorHandler = require('./middlewares/error.middleware')
const notFoundHandler = require('./middlewares/notFound.middleware')

const authRouter = require('./modules/v1/auth/auth.route.js')

const app = express();

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use(flash());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', '..', 'FrontEnd', "views"))

app.use('/auth', authRouter)

app.get('/', (req, res) => res.render('music/index.ejs'))

// app.use(notFoundHandler)
// app.use(errorHandler)

module.exports = app