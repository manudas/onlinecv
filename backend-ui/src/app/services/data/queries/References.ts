import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'name',
    'role',
    'description',
    'company',
    'company_url',
    'keywords',
    'language',
    'phone',
    'email',
    'order'
]

const mutationFields = [
    'id: _id',
]

export const QueryReferences = (
    lang: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'references',
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

export const MutateReferences = (data) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putReferences',
            variables: {
                references: {
                    value: data,
                    required: true,
                    type: '[ReferenceInput]'
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


export const RemoveReference = (
    id: string
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeReference',
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