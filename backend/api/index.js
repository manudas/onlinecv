const {
    Init: MongoInitialiser
} = require('@helpers/MongoInitialiser');

// const rest = require('./rest');
const graphql = require('./graphql');

MongoInitialiser();

module.exports = {
    // rest,
    graphql
};