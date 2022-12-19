import { query, mutation } from 'gql-query-builder';

const settingsFields = [
    'id: _id',
    'backgroundImage',
    'sendToEmail',
    'smtpServer',
    'smtpPort',
    'smtpUsername',
    'smtpPassword',
    'messagingEmail',
];

export const QuerySettings = (
    lang: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'settings',
        variables: {
            language: {
                value: lang,
                required: true
            },
        },
        fields: settingsFields
    });

    return {
        query: queryWithoutVars,
        variables
    };
};

export const MutateSettings = (settings) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putSettings',
            variables: {
                settings: {
                    value: settings,
                    required: true,
                    type: 'SettingsInput'
                }
            },
        }
    );

    return {
        query: queryWithoutVars,
        variables
    };
};
