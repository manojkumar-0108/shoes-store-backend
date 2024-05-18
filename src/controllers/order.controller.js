const { StatusCodes } = require('http-status-codes');
const { OrderService } = require('../services');
const { SuccessResponse } = require('../utils/common');


const orderService = new OrderService();

async function placeOrder(req, res, next) {

    try {
        const sessionURL = await orderService.placeOrder(req.body, req.user.id);

        SuccessResponse.data = sessionURL;
        SuccessResponse.message = "Successfully placed order";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function getAllOrders(req, res, next) {

    try {
        const orders = await orderService.getAllOrders();

        SuccessResponse.data = orders;
        SuccessResponse.message = "Fetched orders successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function getUserOrders(req, res, next) {

    try {
        const orders = await orderService.getUserOrders(req.user.id);

        SuccessResponse.data = orders;
        SuccessResponse.message = "Fetched orders successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function updateOrderStatus(req, res, next) {

    try {

        console.log("Order status recieved :", req.body.status);

        const response = await orderService.updateOrderStatus(req.params.orderId, req.body.status);

        SuccessResponse.data = response;
        SuccessResponse.message = "Status Updated successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function verfiyOrder(req, res, next) {

    try {
        const response = await orderService.verfiyOrder(req.params.orderId, req.body.success);

        SuccessResponse.data = response;
        SuccessResponse.message = "Order verified successfully";
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
    placeOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    verfiyOrder
};