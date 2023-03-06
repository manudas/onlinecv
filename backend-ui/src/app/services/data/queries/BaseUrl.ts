import { query } from 'gql-query-builder'

export const QueryBaseUrl = () => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'baseUrl',
    });

    return {
        query: queryWithoutVars,
        variables
    }
}
