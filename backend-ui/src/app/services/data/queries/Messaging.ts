import { mutation, query } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'from',
    'to',
    'name',
    'subject',
    'message',
    'date'
]

export const QueryMessageTypes = () => {
    const { query: queryWithoutVars, variables } = query({ operation: 'getMessageTypes' })

    return { query: queryWithoutVars, variables }
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

    return { query: queryWithoutVars, variables }
}
export const sendMessage = (
    name: string,
    from: string,
    to: string,
    subject: string,
    message: string,
    language: string,
) => {
    const {
        query: queryWithoutVars,
        variables
    } = mutation({
        operation: 'sendMessage',
        variables: {
            message: {
                value: {
                    name,
                    from,
                    to,
                    subject,
                    message
                },
                required: true,
                type: "MessageInput"
            },
            language: {
                required: true,
                value: language
            }
        },
    })

    return { query: queryWithoutVars, variables }
}
export const deleteMessages = (
    id: string[]
) => {
    const {
        query: queryWithoutVars,
        variables
    } = mutation({
        operation: 'deleteMessages',
        variables: {
            id: {
                value: id,
                required: true,
                type: '[String!]'
            },
        },
    })

    return { query: queryWithoutVars, variables }
}