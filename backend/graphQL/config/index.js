
// Require and construct the schema
const rootSchema = require('@app/graphQL/schemas');

const resolvers = require('@app/graphQL/resolvers');

const { protectResolver } = require('@app/graphQL/config/resolvers');

const models = require('@models');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Merge all resolvers
const mergedResolvers = Object.values(resolvers).reduce((previeousValue, currentValue) => {
    const keys = Object.keys(currentValue);
    keys.forEach((type) => {
        Object.keys(currentValue[type]).forEach(resolverName => {
            previeousValue[type] = {...previeousValue[type], [resolverName]: protectResolver(type, resolverName, currentValue[type][resolverName])};
        })
        // previeousValue[key] = {...previeousValue[key], ...currentValue[key]};
    })
    return previeousValue;
}, {});

const schema = makeExecutableSchema({
    typeDefs: rootSchema,
    resolvers: mergedResolvers,
});

const onOperation = (request, _arguments, result) => {
    const { errors } = result;
    const { headers: { accept }} = request;
    if (errors) {
        const unauthenticated = errors.some(err => err?.extensions?.code === 'UNAUTHENTICATED');

        return [
            JSON.stringify(result),
            Object.assign(Object.assign({}, (!unauthenticated
                ? {
                    status: 500,
                    statusText: 'Bad Request / Internal Server Error',
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

const context = (request) => {
    return {
        models,
        request
    }
}

module.exports = {
    onOperation,
    schema,
    context,
}