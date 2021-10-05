import  { query } from 'gql-query-builder'
import {
    DataService,
} from './data.service'

export const getUserData = (lang: string) => {
    const {
        query: queryWithoutVars,
        variables
    } = query({
        operation: 'details',
        variables: {
            language: { value: lang, required: true },
        },
        fields: [
            'name',
            'surname',
            'primaryRole',
            'secondaryRole',
            'nickname'
        ]
    });
    const dataService = DataService.factory()
    const userData = dataService.readData(queryWithoutVars, variables)

    return userData;
}