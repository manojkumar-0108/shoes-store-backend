const express = require('express');
const { pingCheck, orderController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

const orderRouter = express.Router();

orderRouter.get('/ping', pingCheck('Order API is live...'));

orderRouter.get('/',
    userMiddleware.checkAuth,
    userMiddleware.isCustomer,
    orderController.getUserOrders
);

orderRouter.post('/',
    userMiddleware.checkAuth,
    userMiddleware.isCustomer,
    orderController.placeOrder
);

module.exports = orderRouter;