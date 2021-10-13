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

export const getUserDetails = (lang: string) => {
    const {
        query: queryWithoutVars,
        variables
    } = query([
        {
            operation: 'details',
            variables: {
                language: { value: lang, required: true },
            },
            fields: [
                'profileImage',
                'name',
                'surname',
                'address',
                'phone',
                'birthInfo',
                'email',
                /*
                """
                // qr_code: String, // qr_code will be generated on the fly
                """
                */
                'keywords',
                'language',
                'primaryRole',
                'secondaryRole',
                'nickname'
            ]
        },
        {
            operation: 'allExperiences',
            variables: {
                language: { value: lang, required: true },
            },
            fields: [
                'description',
                'type',
                'start_date',
                'finish_date',
                'role',
                'company',
                'company_url',
                'keywords',
                'language',
                'order',
            ]
        },
    ]);
    const dataService = DataService.factory()
    const userDetails = dataService.readData(queryWithoutVars, variables)

    return userDetails;
}