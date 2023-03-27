import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'profileImage',
    'name',
    'surname',
    'address',
    'phone',
    'birthInfo',
    'email',
    'keywords',
    'language',
    'primaryRole',
    'secondaryRole',
    'nickname',
    'description'
]

const mutationFields = [
    'id: _id',
]

export const QueryDetails = (
    lang: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'details',
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


// export const MutateDetails =
// `
//     mutation MutateDetails($details: DetailsInput!) {
//         putDetails(details: $details) {
//             # return id if everything was ok
//             id: _id
//         }
//     }
// `;


export const MutateDetails = (
    details
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putDetails',
            variables: {
                details: {
                    value: details,
                    type: 'DetailsInput',
                    required: true,
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