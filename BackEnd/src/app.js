"use strict";

const path = require("path");

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const errorHandler = require('./middlewares/error.middleware')
const notFoundHandler = require('./middlewares/notFound.middleware')

const headers = require('./middlewares/header.middleware')
const route = require('./router/route')
const authRouter = require('./modules/v1/auth/auth.route.js')

const app = express();

app.use(cookieParser());
app.use(helmet())
app.use(headers)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', '..', 'FrontEnd', "views"))

app.use('/api/v1/auth', authRouter)

app.use(route)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app