import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'data',
    'language',
]

const mutationFields = [
    'id: _id',
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
            fields: mutationFields
        }
    )

    return {
        query: queryWithoutVars,
        variables
    }
}


export const RemoveResume = (
    id: string
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeResume',
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