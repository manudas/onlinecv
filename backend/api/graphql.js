const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const schemas = require('@app/graphQL/schemas');
const resolvers = require('@app/graphQL/resolvers');

// Construct a schema, using GraphQL schema language
// console.log(schemas);
const rootSchema = buildSchema(schemas);

// The root provides a resolver function for each API endpoint
var rootResolver = {
    ...resolvers
};

module.exports = (debug = false) => graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: debug,
});