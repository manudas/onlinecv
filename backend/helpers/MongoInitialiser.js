import mongoose from 'mongoose';

import mongodb_settings from 'app/config/backend/mongo_settings.js';
import niceLog from './logs.js';

const { user, password, host, port, database } = mongodb_settings;

const credentials_str = (user && password) ? `${user}:${password}@` : '';

const connetion_string = `mongodb://${credentials_str}${host}:${port}/${database}`;

const Init = () => {
    niceLog({ data: { text: `Connection string to MongoDB :: ${connetion_string}`, style: 'blue' }, attachTimeStamp: true });
    mongoose.set('strictQuery',false);
    mongoose.connect(connetion_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export {
    Init,
};