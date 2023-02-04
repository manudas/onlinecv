import { AuthenticationInput } from '@app/types/Authentication'
import { mutation, query } from 'gql-query-builder'

const queryFields = [
    'token',
    'authenticated'
]

const mutationFields = [
    'token',
    'authenticated'
]

export const QueryCheckToken = () => {
    const { query: queryWithoutVars } = query({
        operation: 'checkToken',
        fields: queryFields
    })

    return {
        query: queryWithoutVars,
    }
}

export const QueryAdminUserExists = () => {
    const { query: queryWithoutVars } = query({
        operation: 'checkAdminUserExists',
    })

    return {
        query: queryWithoutVars,
    }
}

export const MutateSignUp = (authenticationData: AuthenticationInput) => {
    const { query: queryWithoutVars, variables } = mutation({
        operation: 'signup',
        variables: {
            authenticationData: {
                value: authenticationData,
                type: 'AuthenticationInput',
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

export const MutateAuthentication = (authenticationData: AuthenticationInput) => {
    const { query: queryWithoutVars, variables } = mutation({
        operation: 'authentication',
        variables: {
            authenticationData: {
                value: authenticationData,
                type: 'AuthenticationInput',
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