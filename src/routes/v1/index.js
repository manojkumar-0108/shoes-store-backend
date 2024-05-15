const express = require('express');

const { pingCheck } = require('../../controllers');


const v1Router = express.Router();


v1Router.get('/ping', pingCheck('API version V1 is live...'));


module.exports = v1Router;