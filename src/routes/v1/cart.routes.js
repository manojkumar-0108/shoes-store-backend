const express = require('express');
const { pingCheck, cartController } = require('../../controllers');


const cartRouter = express.Router();


/**
 * /api/v1/users/ping
 */

cartRouter.get('/ping', pingCheck('Cart API is live...'));

cartRouter.post('/:userId/products/:productId', cartController.addToCart);

cartRouter.get('/:userId/products/', cartController.getAllCartItems);

cartRouter.delete('/:userId/products/:productId', cartController.removeFromCart);

module.exports = cartRouter;