import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'description',
    'type',
    'start_date',
    'finish_date',
    'role',
    'company',
    'company_url',
    'details',
    'keywords',
    'language',
    'order'
]

const mutationFields = [
    'id: _id',
]

export const QueryExperiences = (
    lang: string,
    type: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'experiences',
        variables: {
            language: {
                value: lang,
                required: true
            },
            type: {
                value: type,
                required: true,
            }
        },
        fields: queryFields
    })

    return {
        query: queryWithoutVars,
        variables
    }
}

export const MutateExperiences = (experiences) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putExperience',
            variables: {
                experiences: {
                    value: experiences,
                    required: true,
                    type: '[ExperienceInput]'
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


export const RemoveExperience = (
    id: string
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeExperience',
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