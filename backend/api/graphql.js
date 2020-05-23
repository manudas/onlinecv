const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');

import schemas from '@app/graphQL/schemas';
import resolvers from '@app/graphQL/resolvers';

// Construct a schema, using GraphQL schema language
const rootSchema = buildSchema(schemas);
// The root provides a resolver function for each API endpoint
var rootResolver = {
    ...resolvers
};

export default graphqlHTTP({
    schema: rootSchema,
    rootValue: rootResolver,
    graphiql: debug,
})(debug = false);