import  { query } from 'gql-query-builder'

const translationFields = [
    'id: _id',
    'language',
    'module',
    'tag',
    'text',
    'domain',
]

export const getTranslationsQuery = (lang: string, tags: string[], modules: string[], domain: string | null = null) => {
    const {
        query: queryWithoutVars,
        variables
    } = query({
        operation: 'translations',
        variables: {
            language: {
                value: lang,
                required: true
            },
            tags: {
                value: tags,
                required: true,
                type: "[String!]"
            },
            modules: {
                value: modules,
                required: true,
                type: "[String!]"
            },
            domain: {
                value: domain,
            },
        },
        fields: translationFields
    })

    return {
        query: queryWithoutVars,
        variables
    }
}