const express = require('express');
const { pingCheck } = require('../../controllers');

const userRouter = require('./user.routes');
const v1Router = express.Router();


v1Router.get('/ping', pingCheck('API version V1 is live...'));

v1Router.use('/users', userRouter);

module.exports = v1Router;