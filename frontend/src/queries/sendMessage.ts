import  { mutation } from 'gql-query-builder'

export const receiveMessage = (
    name: string,
    from: string,
    subject: string,
    message: string,
    language: string,
) => {
    const {
        query: queryWithoutVars,
        variables
    } = mutation({
        operation: 'receiveMessage',
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
            language: {
                required: true,
                value: language
            }
        },
    })

    return {
        query: queryWithoutVars,
        variables
    }
}