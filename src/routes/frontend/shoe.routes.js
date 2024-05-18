const express = require('express');
const { pingCheck, shoeController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

const shoeRouter = express.Router();

shoeRouter.get('/ping',
    userMiddleware.checkAuth,
    pingCheck('Shoe API is live...')
);

shoeRouter.get('/',
    shoeController.getShoes
);

module.exports = shoeRouter;