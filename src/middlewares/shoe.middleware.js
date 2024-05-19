
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");

function validateCreateRequest(req, res, next) {

    console.log(req.body);

    if (!req.body.name || !req.body.description || !req.body.price || !req.body.category || !req.body.image) {

        let details = new Array();

        if (!req.body.name) {
            details.push("name is not found in incomming request in correct form")
        }

        if (!req.body.description) {
            details.push("description is not found in incomming request in correct form")
        }

        if (!req.body.price) {
            details.push("price is not found in incomming request in correct form")
        }

        if (!req.body.category) {
            details.push("category is not found in incomming request in correct form")
        }

        if (!req.body.image) {
            details.push("image url is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    next();
}




module.exports = {
    validateCreateRequest
};