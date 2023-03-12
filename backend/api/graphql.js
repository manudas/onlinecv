import { createHandler } from 'graphql-http/lib/use/express';
import { context, onOperation, schema } from 'app/graphQL/config/index.js';

export default createHandler({
    onOperation,
    schema: schema,
    context
});