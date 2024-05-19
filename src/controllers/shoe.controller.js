const { StatusCodes } = require('http-status-codes');
const { ShoeService } = require('../services');
const { SuccessResponse } = require('../utils/common');


const shoeService = new ShoeService();

async function addShoe(req, res, next) {

    try {
        const shoe = await shoeService.createShoe({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
        });

        SuccessResponse.data = shoe;
        SuccessResponse.message = "Added shoe successfully";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function getShoes(req, res, next) {

    try {
        const shoes = await shoeService.getAllShoes();

        SuccessResponse.data = shoes;
        SuccessResponse.message = "Fetched shoes successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function getShoe(req, res, next) {

    try {
        const shoe = await shoeService.getShoe();

        SuccessResponse.data = shoe;
        SuccessResponse.message = "Fetched shoe successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

async function updateShoe(req, res, next) {

    try {
        let imageFilename = `${req.file.filename}`;

        const shoe = await shoeService.updateShoe(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: imageFilename,
        });

        SuccessResponse.data = shoe;
        SuccessResponse.message = "Successfully updated Shoe";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    }
    catch (error) {
        next(error);
    }
}

async function removeShoe(req, res, next) {
    try {
        const shoe = await shoeService.removeShoe(req.params.shoeId);

        SuccessResponse.data = shoe;
        SuccessResponse.message = "Shoe removed successfully";
        SuccessResponse.statusCode = StatusCodes.OK;
        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);


    } catch (error) {
        next(error);
    }
}


module.exports = {
    addShoe,
    getShoes,
    getShoe,
    updateShoe,
    removeShoe
};