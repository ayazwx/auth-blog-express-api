const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' }); // Load environment variables from .env  or .env.development file

const sslCert = fs.readFileSync(process.env.PG_SSL_CA, 'utf8');

const dbConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca:sslCert
    },
};


module.exports = dbConfig;