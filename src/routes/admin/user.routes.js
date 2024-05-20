const express = require('express');
const { pingCheck, userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

const userRouter = express.Router();



userRouter.get('/ping', pingCheck('Admin AUTH API is live...'));

userRouter.post('/login',
    userMiddleware.validateLoginRequest,
    userController.login
);


userRouter.post('/role',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    userController.addRoleToUser
);


userRouter.delete('/role',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    userController.revokeUserRole
);

module.exports = userRouter;