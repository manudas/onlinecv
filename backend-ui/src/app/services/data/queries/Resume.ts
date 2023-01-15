import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'data',
    'language',
]

export const QueryResume = (
    lang: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'resume',
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

export const MutateResume = (data) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putResume',
            variables: {
                resume: {
                    value: data,
                    required: true,
                    type: 'ResumeInput'
                }
            },
        }
    )

    return {
        query: queryWithoutVars,
        variables
    }
}


export const RemoveResume = (
    language: string
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeResume',
            variables: {
                language: {
                    value: language,
                    type: 'String',
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