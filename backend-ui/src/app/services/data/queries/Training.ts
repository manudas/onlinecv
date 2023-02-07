import { query, mutation } from 'gql-query-builder';

const trainingFields = [
    'id: _id',
    'tag',
    'description',
    'type',
    'school',
    'school_url',
    'start_date',
    'finish_date',
    'final_project',
    'average_grade',
    'keywords',
    'language',
    'order'
];

export const QueryTrainings = (
    lang: string,
    type: string
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'trainings',
        variables: {
            language: {
                value: lang,
                required: true
            },
            type: {
                value: type,
            }
        },
        fields: trainingFields
    });

    return {
        query: queryWithoutVars,
        variables
    };
};

export const MutateTrainings = (trainings) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putTrainings',
            variables: {
                trainings: {
                    value: trainings,
                    required: true,
                    type: '[TrainingInput]'
                }
            },
            fields: [
                // return id if everything was ok
                'id: _id'
            ]
        }
    );

    return {
        query: queryWithoutVars,
        variables
    };
};

export const RemoveTraining = (id) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removeTraining',
            variables: {
                id: {
                    value: id,
                    required: true,
                    type: 'ID'
                }
            }
        }
    );

    return {
        query: queryWithoutVars,
        variables
    };
};
