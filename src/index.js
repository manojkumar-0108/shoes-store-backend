/**
 * packages import statements
 */
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

/**
 * custom functions import statements
 */

const { serverConfig } = require('./config');
const { pingCheck } = require('./controllers');
const { errorHandler } = require('./utils');
const apiRouter = require('./routes');

const CRON = require('./utils/helpers/cron.jobs');


/**
 * Main 
 */
const app = express();

//Configuring CORS 
app.use(cors());

//body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.raw());

// Rate Limiter
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).  
})
app.use(limiter);

app.get('/ping', pingCheck('Server is live...'));

app.use('/api', apiRouter);

//last middleware for handling errors
app.use(errorHandler);

app.listen(serverConfig.PORT, () => {

    console.log(`Server started at port ${serverConfig.PORT}`);

    //cron job to cancel all the orders whose payment is not completed within 20 minutes
    CRON();
});