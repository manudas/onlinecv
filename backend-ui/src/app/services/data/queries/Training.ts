/**
 * Example of query:
 *
 * const loginQuery = `{
 *

        OPTION A)
        query namedQuery

        OPTION B)
        annonymous query

        query($email: String, $password: String) {
            login(email: $email, password: $password) {
                token
                user
            }
        }
    }`
 *
 */
    export const QueryTrainings =
    `
    query QueryTrainings($language: String!, $type: String!) {
        Trainings(language: $language, type: $type) {

            id: _id
            tag
            description
            type
            school
            school_url
            start_date
            finish_date
            final_project
            average_grade
            keywords
            language
            order
        }
    }
`


export const MutateTrainings =
`
    mutation MutateTrainings($trainings: [TrainingInput]!) {
        putTrainings(trainings: $trainings) {
            # return id if everything was ok
            id: _id
        }
    }
`

export const RemoveTraining =
`
    mutation RemoveTraining($id: ID!) {
        removeTraining(id: $id)
    }
`