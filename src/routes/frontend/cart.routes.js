const express = require('express');
const { pingCheck, cartController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');


const cartRouter = express.Router();


/**
 * /api/v1/users/ping
 */

cartRouter.get('/ping', pingCheck('Cart API is live...'));

cartRouter.post('/products/:productId',
    userMiddleware.checkAuth,
    cartController.addToCart
);

cartRouter.get('/products/',
    userMiddleware.checkAuth,
    cartController.getAllCartItems
);

cartRouter.delete('/products/:productId',
    userMiddleware.checkAuth,
    cartController.removeFromCart
);

module.exports = cartRouter;