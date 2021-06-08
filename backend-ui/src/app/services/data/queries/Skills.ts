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
export const QuerySkills =
    `
    query QuerySkills($language: String!, $type: String!) {
        Skills(language: $language, type: $type) {
            id: _id
            tag
            description
            skill_level
            related_knowledge
            type
            developed_projects
            keywords
            language
        }
    }
`


export const MutateSkills =
`
    mutation MutateSkills($skills: [SkillInput]!) {
        putSkills(skills: $skills) {
            # return id if everything was ok
            id: _id
        }
    }
`

export const RemoveSkill =
`
    mutation RemoveSkill($id: ID!) {
        removeSkill(id: $id)
    }
`