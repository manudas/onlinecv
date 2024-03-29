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
        languages(language: $language) {
            id: _id
            name
            certification
            school
            school_url
            written_level
            spoken_level
            keywords
            language
            order
        }
    }
`


export const MutateLanguages =
`
    mutation MutateLanguages($languages: [LanguageInput]!) {
        putLanguages(languages: $languages) {
            # return id if everything was ok
            id: _id
        }
    }
`

export const RemoveLanguage =
`
    mutation RemoveLanguage($id: ID!) {
        removeLanguage(id: $id)
    }
`