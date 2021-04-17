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
    export const QueryExperiences =
    `
    query QueryExperiences($language: String!, $type: String!) {
        Experiences(language: $language, type: $type) {
            id: _id
            description
            type
            start_date
            finish_date
            role
            company
            company_url
            keywords
            language
            order
        }
    }
`


export const MutateExperiences =
`
    mutation MutateExperiences($experiences: [WorkExperienceInput]!) {
        putWorkExperience(workExperiences: $experiences) {
            # return id if everything was ok
            id: _id
        }
    }
`

export const RemoveExperience =
`
    mutation RemoveExperience($id: ID!) {
        removeExperience(id: $id)
    }
`