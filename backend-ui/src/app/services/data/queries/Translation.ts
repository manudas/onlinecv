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
export const Translations =
    `
        query Translations($tags: [String!]!, $modules: [String!]!, $language: String!) {
            translations(tags: $tags, modules: $modules, language: $language) {
                # id is not not really needed for the translations and could be removed from this query
                id: _id
                language
                module
                tag
                text
            }
        }
    `;