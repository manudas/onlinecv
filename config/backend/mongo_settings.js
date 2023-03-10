const fs = require('fs');

const passFile = process.env.MONGO_PASSWORD_FILE ?? '/app/backend/config/mongodb/app_mongo_password.txt';

const user = 'dbUser';
const password = fs.readFileSync(passFile).toString() ?? '';
const host = 'db';
const port = 27017;
const database = 'onlinecv';

module.exports = {
    user,
    password,
    host,
    port,
    database
};