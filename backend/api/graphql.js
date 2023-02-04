const { GraphQLError } = require('graphql');
const { createHandler } = require('graphql-http/lib/use/express');

// Require and construct the schema
const rootSchema = require('@app/graphQL/schemas');

const resolvers = require('@app/graphQL/resolvers');
// console.log(resolvers);

const models = require('@models');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Merge all resolvers
const rootResolver = Object.values(resolvers).reduce((previeousValue, currentValue) => {
    const keys = Object.keys(currentValue);
    keys.forEach((key) => {
        previeousValue[key] = {...previeousValue[key], ...currentValue[key]};
    })
    return previeousValue;
}, {});

const schema = makeExecutableSchema({
    typeDefs: rootSchema,
    resolvers: rootResolver,
});

const onOperation = (request, _arguments, result) => {
    const { errors } = result;
    const { headers: { accept }} = request;
    if (errors) {
        const unauthenticated = errors.some(err => err?.extensions?.code === 'UNAUTHENTICATED');
        const someErorIsNotGraphQLError = errors.some(err => err instanceof GraphQLError);





       console.error(errors[0].extensions?.code)




        return [
            JSON.stringify(result),
            Object.assign(Object.assign({}, (!unauthenticated
                ? {
                    status: 400,
                    statusText: 'Bad Request',
                }
                : {
                    status: 401,
                    statusText: 'Unauthorized',
                })), { headers: {
                    'content-type': accept.startsWith('application/json')
                        ? 'application/json; charset=utf-8'
                        : 'application/graphql-response+json; charset=utf-8',
                } }),
        ];
    }
    return null;
}



module.exports = createHandler({
    onOperation,
    schema: schema,
    context: (request) => {
        return {
            models,
            request
        }
    },
});