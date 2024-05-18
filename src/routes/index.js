const express = require('express');
const frontendRouter = require('./frontend');
const adminRouter = require('./admin');


const apiRouter = express.Router();

/**
 * any request starting with /v1 -> will route to v1 router
 */

apiRouter.use('/admin', adminRouter);

apiRouter.use('/frontend', frontendRouter);

module.exports = apiRouter;