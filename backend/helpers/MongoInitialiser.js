const mongoose = require('mongoose');

const mongodb_settings = require('@config/backend/mongo_settings');

const {
    user,
    password,
    host,
    port,
    database
} = mongodb_settings;

const credentials_str = (user && password) ? `${user}:${password}@` : '';

/*
const connetion_string =
    `mongodb://${credentials_str}${host}:${port}/${database}?authSource=${database}`;
*/
const connetion_string =
    `mongodb://${credentials_str}${host}:${port}/${database}`;

const Init = () => {
    console.log("Connection string to MongoDB", connetion_string);
    mongoose.connect(connetion_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    Init,
};
