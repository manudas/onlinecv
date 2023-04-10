import  { mutation } from 'gql-query-builder'

export const sendMessage = (
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