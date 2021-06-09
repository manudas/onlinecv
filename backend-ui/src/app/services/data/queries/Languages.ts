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
    export const QueryLanguages =
    `
    query QueryLanguages($language: String!) {
        Languages(language: $language) {

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


export const MutateLanguages =
`
    mutation MutateLanguages($languages: [LanguageInput]!) {
        putLanguages(languages: $Languages) {
            # return id if everything was ok
            id: _id
        }
    }
`

export const RemoveLanguages =
`
    mutation RemoveLanguages($id: ID!) {
        removeLanguages(id: $id)
    }
`