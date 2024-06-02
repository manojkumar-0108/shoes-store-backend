const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT || 'development',

    SALT_ROUNDS: process.env.SALT_ROUNDS || 8,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
    JWT_SECRET: process.env.JWT_SECRET || 'your@1k2b_secret@cd_key@k1y2z3',

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

    FRONT_END_URL: process.env.FRONT_END_URL,

    DB_URL: process.env.DB_URL,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT || 5432,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_NAME: process.env.DB_NAME
}

