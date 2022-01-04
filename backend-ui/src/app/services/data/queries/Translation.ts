import { query, mutation } from 'gql-query-builder';

const translationFields = [
    'id: _id',
    'language',
    'module',
    'tag',
    'text',
    'domain',
    'missing',
    'accessCounter',
    'lastTimeFetched'
];

export const Translations = (
    lang: string,
    tags: string[],
    modules: string[],
    domain: string = null
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'translations',
        variables: {
            language: {
                value: lang,
                required: true
            },
            tags: {
                value: tags,
                required: true,
                type: '[String!]'
            },
            modules: {
                value: modules,
                required: true,
                type: '[String!]'
            },
            domain: {
                value: domain
            }
        },
        fields: translationFields
    });

    return {
        query: queryWithoutVars,
        variables
    };
};

export const MissingTranslations = (lang: string) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'missingTranslations',
        variables: {
            language: {
                value: lang,
                required: true
            }
        },
        fields: translationFields
    });

    return {
        query: queryWithoutVars,
        variables
    };
};

export const TranslatedStrings = (lang: string) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'translatedStrings',
        variables: {
            language: {
                value: lang,
                required: true
            }
        },
        fields: translationFields
    });

    return {
        query: queryWithoutVars,
        variables
    };
};

export const SaveTranslation = (translation) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putTranslation',
            variables: {
                translation: {
                    value: translation,
                    required: true,
                    type: 'TranslationInput'
                }
            },
            fields: translationFields
        }
    );

    return {
        query: queryWithoutVars,
        variables
    };
};

export const DeleteTranslation = (translationId) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeTranslation',
            variables: {
                id: {
                    value: translationId,
                    required: true,
                    type: 'ID'
                }
            },
            fields: translationFields
        }
    );

    return {
        query: queryWithoutVars,
        variables
    };
};
