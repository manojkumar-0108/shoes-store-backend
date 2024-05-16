const express = require('express');
const { pingCheck } = require('../../controllers');

const userRouter = require('./user.routes');
const shoeRouter = require('./shoe.routes');
const cartRouter = require('./cart.routes');

const v1Router = express.Router();


v1Router.get('/ping', pingCheck('API version V1 is live...'));

v1Router.use('/users', userRouter);
v1Router.use('/shoes', shoeRouter);
v1Router.use('/carts', cartRouter);

module.exports = v1Router;