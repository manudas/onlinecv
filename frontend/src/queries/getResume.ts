import  { query } from 'gql-query-builder'

export const getUserIntroductionQuery = (lang: string) => {
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
    })

    return {
        query: queryWithoutVars,
        variables
    }
}

export const getUserFullResumeQuery = (lang: string) => {
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
            operation: 'experiences',
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
        {
            operation: 'experienceTypes',
        },
        {
            operation: 'trainings',
            variables: {
                language: { value: lang, required: true },
            },
            fields: [
                'tag',
                'description',
                'type',
                'school',
                'start_date',
                'finish_date',
                'final_project',
                'school_url',
                'average_grade',
                'keywords',
                'language',
                'order'
            ]
        },
        {
            operation: 'trainingTypes',
        },
        {
            operation: 'skills',
            variables: {
                language: { value: lang, required: true }
            },
            fields: [
                'tag',
                'description',
                'skill_level',
                'related_knowledge',
                'type',
                'developed_projects',
                'keywords',
                'language',
                'order'
            ]
        }
    ])

    return {
        query: queryWithoutVars,
        variables
    }
}