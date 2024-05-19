const express = require('express');
const { pingCheck, shoeController } = require('../../controllers');
const { userMiddleware, shoeMiddleware } = require('../../middlewares');

const shoeRouter = express.Router();

shoeRouter.get('/ping',
    userMiddleware.checkAuth,
    pingCheck('Shoe API is live...')
);

shoeRouter.post('/',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    shoeMiddleware.validateCreateRequest,
    shoeController.addShoe
);

shoeRouter.get('/',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    shoeController.getShoes
);


shoeRouter.get('/:id',
    shoeController.getShoe
);

shoeRouter.patch('/:id',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    shoeController.updateShoe);

shoeRouter.delete('/:shoeId',
    userMiddleware.checkAuth,
    userMiddleware.isAdmin,
    shoeController.removeShoe);

module.exports = shoeRouter;