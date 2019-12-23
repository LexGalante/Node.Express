const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const dotenv = require("dotenv-safe");
//enviroment configuration
dotenv.config();
//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
//inject routes
app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/auth', authRouter);

module.exports = app;
