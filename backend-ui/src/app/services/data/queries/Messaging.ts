import { query } from 'gql-query-builder'

export const QueryMessageTypes = () => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'getMessageTypes',
    })

    return {
        query: queryWithoutVars,
        variables
    }
}
