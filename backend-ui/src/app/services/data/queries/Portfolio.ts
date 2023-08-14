import { query, mutation } from 'gql-query-builder'

const queryFields = [
    'id: _id',
    'name',
    'description',
    'keywords',
    'language',
    'pictures {name, description, data}',
    'url',
    'order',
]

export const QueryPortfolio = (
    lang: string,
) => {
    const { query: queryWithoutVars, variables } = query({
        operation: 'portfolio',
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

export const MutatePortfolio = (data) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'putPortfolio',
            variables: {
                portfolio: {
                    value: data,
                    required: true,
                    type: '[PortfolioInput]'
                }
            },
            fields: queryFields // we will refetch QueryPortfolio
        }
    )

    return {
        query: queryWithoutVars,
        variables
    }
}


export const RemovePortfolio = (
    id: string
) => {
    const { query: queryWithoutVars, variables } = mutation(
        {
            operation: 'removePortfolio',
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