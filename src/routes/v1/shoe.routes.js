const express = require('express');
const { pingCheck, shoeController, userController } = require('../../controllers');
const { userMiddleware, shoeMiddleware, upload } = require('../../middlewares');

const shoeRouter = express.Router();


/**
 * /api/v1/users/ping
 */

shoeRouter.get('/ping',
    userMiddleware.checkAuth,
    pingCheck('Shoe API is live...')
);

shoeRouter.post('/',
    userMiddleware.checkAuth,
    shoeMiddleware.validateCreateRequest,
    upload.single('image'),
    shoeController.addShoe
);

shoeRouter.get('/', shoeController.getShoes);

shoeRouter.get('/:id', shoeController.getShoe);

shoeRouter.patch('/:id',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    shoeController.updateShoe);

shoeRouter.delete('/:id',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    shoeController.removeShoe);

module.exports = shoeRouter;