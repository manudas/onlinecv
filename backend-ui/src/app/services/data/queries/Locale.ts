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
export const Locale =
    `
        query AvailableLocales {
            getLocales {
                id: _id
                name
                iso
                flag
            }
        }
    `;