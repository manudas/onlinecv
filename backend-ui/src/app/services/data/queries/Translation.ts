import {
    query,
    mutation
} from 'gql-query-builder'

export const Translations = (lang: string, tags: string[], modules: string[], domain: string = null) => {
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
                value: domain
            },
        },
        fields: [
            'id: _id',
            'language',
            'module',
            'tag',
            'text',
            'domain',
            'missing',
            'accessCounter',
            'lastTimeFetched'
        ]
    })

    return {
        query: queryWithoutVars,
        variables
    }
}


export const MissingTranslations = (lang: string) => {
    const {
        query: queryWithoutVars,
        variables
    } = query({
        operation: 'missingTranslations',
        variables: {
            language: {
                value: lang,
                required: true
            },
        },
        fields: [
            'id: _id',
            'language',
            'module',
            'tag',
            'text',
            'domain',
            'missing',
            'accessCounter',
            'lastTimeFetched'
        ]
    })

    return {
        query: queryWithoutVars,
        variables
    }
}


export const TranslatedStrings = (lang: string) => {
    const {
        query: queryWithoutVars,
        variables
    } = query({
        operation: 'translatedString',
        variables: {
            language: {
                value: lang,
                required: true
            },
        },
        fields: [
            'id: _id',
            'language',
            'module',
            'tag',
            'text',
            'domain',
            'missing',
            'accessCounter',
            'lastTimeFetched'
        ]
    })

    return {
        query: queryWithoutVars,
        variables
    }
}

export const SaveTranslation = (translation) => {
    const {
        query: queryWithoutVars,
        variables
    } = mutation({
        operation: 'putTranslation',
        variables: {
            translation: {
                value: translation,
                required: true,
                type: "TranslationInput"
            },
        },
        fields: [
            'id: _id',
        ]
    })

    return {
        query: queryWithoutVars,
        variables
    }
}