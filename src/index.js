/**
 * packages import statements
 */
const express = require('express');
const rateLimit = require('express-rate-limit');


/**
 * custom functions import statements
 */
const { serverConfig } = require('./config');
const { pingCheck } = require('./controllers');
const apiRouter = require('./routes');


/**
 * Main 
 */
const app = express();

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

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port ${serverConfig.PORT}`);
})