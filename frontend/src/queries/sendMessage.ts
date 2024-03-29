import  { mutation } from 'gql-query-builder'

export const sendMessage = (
    name: string,
    from: string,
    subject: string,
    message: string
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
                    subject,
                    message
                },
                required: true,
                type: "Message"
            },
        },
    })

    return {
        query: queryWithoutVars,
        variables
    }
}