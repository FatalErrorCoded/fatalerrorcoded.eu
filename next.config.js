const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withSass({
    sassLoaderOptions: {},
    env: {
        DB_URI: process.env.DB_URI,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,

        LOCAL_HOSTNAME: process.env.LOCAL_HOSTNAME,
        REMOTE_HOSTNAME: process.env.REMOTE_HOSTNAME,
    }
});
