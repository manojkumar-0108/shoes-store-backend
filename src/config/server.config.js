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
}

