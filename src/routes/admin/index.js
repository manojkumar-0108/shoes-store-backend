const express = require('express');
const { pingCheck } = require('../../controllers');

const userRouter = require('./user.routes');
const shoeRouter = require('./shoe.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

const adminRouter = express.Router();


adminRouter.get('/ping', pingCheck('API version V1 is live...'));

adminRouter.use('/users', userRouter);
adminRouter.use('/shoes', shoeRouter);
adminRouter.use('/carts', cartRouter);
adminRouter.use('/orders', orderRouter);

adminRouter.use('/images', express.static('uploads'));

module.exports = adminRouter;