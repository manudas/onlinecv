// Require and construct the schema
import rootSchema from 'app/graphQL/schemas/index.js';

import resolvers from 'app/graphQL/resolvers/index.js';

import { protectResolver } from 'app/graphQL/config/resolvers.js';

import models from 'app/models/index.js';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Merge all resolvers
const mergedResolvers = Object.values(resolvers).reduce((previousValue, currentValue) => {
    const keys = Object.keys(currentValue);
    keys.forEach((type) => {
        Object.keys(currentValue[type]).forEach(resolverName => {
            previousValue[type] = {...previousValue[type], [resolverName]: protectResolver(type, resolverName, currentValue[type][resolverName])};
        })
    })
    return previousValue;
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

export {
    onOperation,
    schema,
    context,
};