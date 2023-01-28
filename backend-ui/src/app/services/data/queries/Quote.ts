import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'author',
    'quote',
]

const mutationFields = [
    'id: _id',
]

export const QueryQuote = (
    lang: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'quote',
        variables: {
            language: {
                value: lang,
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

export const MutateQuote = (data) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putQuote',
            variables: {
                quote: {
                    value: data,
                    required: true,
                    type: 'QuoteInput'
                }
            },
            fields: mutationFields
        }
    )

    return {
        query: queryWithoutVars,
        variables
    }
}

export const RemoveQuote = (
    id: string
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeQuote',
            variables: {
                id: {
                    value: id,
                    type: 'ID',
                    required: true,
                }
            },
        }
    )

    return {
        query: queryWithoutVars,
        variables
    }
}