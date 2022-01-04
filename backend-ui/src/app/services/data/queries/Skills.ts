export const QuerySkills =
    `
    query QuerySkills($language: String!, $type: String!) {
        skills(language: $language, type: $type) {
            id: _id
            tag
            description
            skill_level
            related_knowledge
            type
            developed_projects
            keywords
            language
            order
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