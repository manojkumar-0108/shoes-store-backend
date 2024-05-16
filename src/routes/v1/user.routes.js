const express = require('express');
const { pingCheck, userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

const userRouter = express.Router();


/**
 * /api/v1/users/ping
 */

userRouter.get('/ping', pingCheck('AUTH API is live...'));


/**
 * /api/v1/users/admin
 */
userRouter.get('/admin',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    pingCheck('Admin User')
);


/**
 * POST Request -> /api/v1/users/register/
 * Request Body -> {name:"Manoj Kumar", email:"a@b.com",password:'123455'}
 */

userRouter.post(
    '/register',
    userMiddleware.validateRegisterRequest,
    userController.register
);


/**
 * POST Request -> /api/v1/users/login/
 * Request Body -> {email:"a@b.com",password:'123455'}
 */

userRouter.post('/login',
    userMiddleware.validateLoginRequest,
    userController.login
);


/**
 * POST Request -> /api/v1/users/role/
 * Request Body -> {role:"admin",userId:1}
 */

userRouter.post('/role',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    userController.addRoleToUser
)


/**
 * DELETE Request -> /api/v1/users/role/
 * Request Body -> {role:"admin",userId:1}
 */

userRouter.delete('/role',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    userController.revokeUserRole
)

module.exports = userRouter;