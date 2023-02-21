print('################################################################# Starting ONLINECV Database #################################################################');

const fs = require('fs');

db.createUser(
    {
        user: process.env.MONGO_USER,
        pwd: fs.readFileSync(process.env.MONGO_PASSWORD_FILE).toString(),
        roles: [
            "readWrite", "dbAdmin"
        ]
    }
);

db.createCollection('locale');

// name, iso, flag
db.locale.insertMany([
    {
        name: 'English',
        iso: 'en',
        flag: 'gb'
    },
    {
        name: 'Español',
        iso: 'es',
        flag: 'es'
    },
]);

db.locale.createIndex( { "iso": 1 }, { unique: true } );

print('############################################################ ONLINECV Database and User Created ##############################################################');
