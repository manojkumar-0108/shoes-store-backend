const { StatusCodes } = require('http-status-codes');
const { CartService } = require('../services');
const { SuccessResponse } = require('../utils/common');


const cartService = new CartService();

async function addToCart(req, res, next) {

    try {
        const cart = await cartService.addToCart(req.user.id, req.params.productId);

        SuccessResponse.success = true;
        SuccessResponse.data = cart;
        SuccessResponse.message = "Successfully added to cart";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function removeFromCart(req, res, next) {

    try {
        const response = await cartService.removeFromCart(req.user.id, req.params.productId);

        SuccessResponse.success = true;
        SuccessResponse.data = response;
        SuccessResponse.message = "Item removed successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function getAllCartItems(req, res, next) {

    try {

        const cartItems = await cartService.getCart(req.user.id);

        SuccessResponse.success = true;
        SuccessResponse.data = cartItems;
        SuccessResponse.message = "Fetched cart successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}


module.exports = {
    addToCart,
    removeFromCart,
    getAllCartItems
};