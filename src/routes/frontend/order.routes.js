const express = require('express');
const { pingCheck, orderController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

const orderRouter = express.Router();

orderRouter.get('/ping', pingCheck('Order API is live...'));

orderRouter.get('/',
    userMiddleware.checkAuth,
    orderController.getUserOrders
);

orderRouter.post('/',
    userMiddleware.checkAuth,
    orderController.placeOrder
);

orderRouter.patch('/status/:orderId',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    orderController.updateOrderStatus
);

orderRouter.patch('/verify/:orderId',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    orderController.verfiyOrder
);

module.exports = orderRouter;