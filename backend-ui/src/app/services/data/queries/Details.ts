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
export const Details =
    `
        query Details($language: String!) {
            details(language: $language) {
                id: _id
                name
                surname
                address
                phone_number
                birth_date
                email
                keywords
                language
                primaryJobName
                secondaryJobName
                nickname
            }
        }
    `;