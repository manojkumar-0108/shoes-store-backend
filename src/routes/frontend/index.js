const express = require('express');
const { pingCheck } = require('../../controllers');

const userRouter = require('./user.routes');
const shoeRouter = require('./shoe.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

const frontendRouter = express.Router();

frontendRouter.get('/ping', pingCheck('API version V1 is live...'));
frontendRouter.use('/users', userRouter);
frontendRouter.use('/shoes', shoeRouter);
frontendRouter.use('/carts', cartRouter);
frontendRouter.use('/orders', orderRouter);


module.exports = frontendRouter;