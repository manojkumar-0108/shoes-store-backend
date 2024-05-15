const express = require('express');
const v1Router = require('./v1');


const apiRouter = express.Router();

/**
 * any request starting with /v1 -> will route to v1 router
 */

apiRouter.use('/v1', v1Router);

module.exports = apiRouter;