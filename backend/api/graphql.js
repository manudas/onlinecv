const { createHandler } = require('graphql-http/lib/use/express');
const { context, onOperation, schema } = require('app/graphQL/config')

module.exports = createHandler({
    onOperation,
    schema: schema,
    context
});