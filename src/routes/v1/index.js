const express = require('express');
const { pingCheck } = require('../../controllers');

const userRouter = require('./user.routes');
const shoeRouter = require('./shoe.routes');

const v1Router = express.Router();


v1Router.get('/ping', pingCheck('API version V1 is live...'));

v1Router.use('/users', userRouter);
v1Router.use('/shoes', shoeRouter);

module.exports = v1Router;