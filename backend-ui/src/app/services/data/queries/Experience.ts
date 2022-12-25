import { query, mutation } from 'gql-query-builder'

const experienceFields = [
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
        fields: experienceFields
    })

    return {
        query: queryWithoutVars,
        variables
    }
}

export const MutateExperiences = (experiences) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putWorkExperience',
            variables: {
                workExperiences: {
                    value: experiences,
                    required: true,
                    type: '[WorkExperienceInput]'
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
            operation: 'removeWorkExperience',
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