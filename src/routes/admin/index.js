const express = require('express');
const { pingCheck } = require('../../controllers');

const userRouter = require('./user.routes');
const shoeRouter = require('./shoe.routes');
const orderRouter = require('./order.routes');

const adminRouter = express.Router();


adminRouter.get('/ping', pingCheck('Admin API is live...'));

adminRouter.use('/users', userRouter);
adminRouter.use('/shoes', shoeRouter);
adminRouter.use('/orders', orderRouter);


module.exports = adminRouter;