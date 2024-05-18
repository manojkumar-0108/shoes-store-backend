const express = require('express');
const { pingCheck, userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

const userRouter = express.Router();


/**
 * /api/v1/users/ping
 */

userRouter.get('/ping', pingCheck('AUTH API is live...'));


userRouter.post(
    '/register',
    userMiddleware.validateRegisterRequest,
    userController.register
);


userRouter.post('/login',
    userMiddleware.validateLoginRequest,
    userController.login
);

module.exports = userRouter;