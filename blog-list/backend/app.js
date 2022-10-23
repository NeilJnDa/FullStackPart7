const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const config = require('./utils/config');

const app = express();
const blogRouter = require('./controllers/blogRouter');
const newUserRouter = require('./controllers/newUserRouter');
const userRouter = require('./controllers/userRouter');

const loginRouter = require('./controllers/loginRouter');
const testRouter = require('./controllers/testRouter');

const middleware = require('./utils/middlewares');
const logger = require('./utils/logger');

const uri = process.env.NODE_ENV === 'test' ? config.MONGODB_URI_TEST : config.MONGODB_URI;

logger.info('connecting to ', uri);

mongoose.connect(uri)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .then(() => {
        if (process.env.NODE_ENV === 'test') {
            logger.info('Database: test');
        } else {
            logger.info('Database: bloglist');
        }
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// Require token to manipulate blogs or user info
app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', middleware.userExtractor, userRouter);

// No token needed when creating new user or logging in
app.use('/api/newUser', newUserRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    app.use('/api/test', testRouter);
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
