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
export const QueryDetails =
    `
    query Details($language: String!) {
        details(language: $language) {
            id: _id
            profileImage
            name
            surname
            address
            phone
            birthInfo
            email
            keywords
            language
            primaryRole
            secondaryRole
            nickname
        }
    }
`;


export const MutateDetails =
`
    mutation MutateDetails($details: DetailsInput!) {
        putDetails(details: $details) {
            # return id if everything was ok
            id: _id
        }
    }
`;