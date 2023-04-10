import { query } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'from',
    'name',
    'subject',
    'message'
]

export const QueryMessageTypes = () => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'getMessageTypes',
    })

    return {
        query: queryWithoutVars,
        variables
    }
}
export const QueryMessagesByTypes = (type: string) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'messages',
        variables: {
            type: {
                value: type,
                required: true
            },
        },
        fields: queryFields
    })

    return {
        query: queryWithoutVars,
        variables
    }
}