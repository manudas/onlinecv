const {
    graphqlHTTP,
} = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const schemas = require('@app/graphQL/schemas');

const resolvers = require('@app/graphQL/resolvers');
// console.log(resolvers);

const models = require('@models');

// Construct a schema, using GraphQL schema language
// console.log(schemas);
const rootSchema = buildSchema(schemas);

// The root provides a resolver function for each API endpoint

const rootResolver = {};
Object.values(resolvers).forEach((resolver) => {
    Object.values(resolver).forEach((rootQuery) => {
        Object.assign(rootResolver, rootQuery);
    });
});
// console.log({context: {
//     models
// }});
module.exports = (debug = false) => graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: debug,
    context: {
        models
    },
    customFormatErrorFn: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
    })
});