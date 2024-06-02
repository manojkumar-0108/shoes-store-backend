const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { SuccessResponse } = require('../utils/common/');



/**
 * POST Request /api/v1/user/register/
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

const userService = new UserService();

async function register(req, res, next) {

    try {
        const response = await userService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.success = true;
        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully created account";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

/**
 * POST Request /api/v1/user/login/
 * Request Body -> {email:"a@b.com",password:'123455'}
 */

async function login(req, res, next) {

    try {
        const response = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.success = true;
        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully signed in";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    }
    catch (error) {
        next(error);
    }
}

/**
 * POST Request /api/v1/user/role/
 * Request Body -> {userId:1,role:'admin'}
 */

async function addRoleToUser(req, res, next) {
    try {
        const user = await userService.addRoleToUser({
            role: req.body.role,
            userId: req.body.userId
        });

        SuccessResponse.success = true;
        SuccessResponse.data = user;
        SuccessResponse.message = "Added role successfully";
        SuccessResponse.statusCode = StatusCodes.OK;
        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);


    } catch (error) {
        next(error);
    }
}

async function revokeUserRole(req, res, next) {
    try {
        const user = await userService.revokeRoleFromUser({
            role: req.body.role,
            userId: req.body.userId
        });

        SuccessResponse.success = true;
        SuccessResponse.data = user;
        SuccessResponse.message = "Revoked role successfully";
        SuccessResponse.statusCode = StatusCodes.OK;
        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);


    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    addRoleToUser,
    revokeUserRole
};