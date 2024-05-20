const express = require('express');
const { pingCheck, cartController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');


const cartRouter = express.Router();


/**
 * /api/v1/users/ping
 */

cartRouter.get('/ping',
    userMiddleware.checkAuth,
    userMiddleware.isCustomer,
    pingCheck('Cart API is live...')
);

cartRouter.post('/products/:productId',
    userMiddleware.checkAuth,
    userMiddleware.isCustomer,
    cartController.addToCart
);

cartRouter.get('/products/',
    userMiddleware.checkAuth,
    userMiddleware.isCustomer,
    cartController.getAllCartItems
);

cartRouter.delete('/products/:productId',
    userMiddleware.checkAuth,
    userMiddleware.isCustomer,
    cartController.removeFromCart
);

module.exports = cartRouter;