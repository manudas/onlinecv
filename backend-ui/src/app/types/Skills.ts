export enum SkillsType {
    all,
    skills,
    computer,
    languages
}

/*
 * GraphQL Schema

          type Skills {
            id: ID!







            keywords: [String]!,
            language: String!
        }

 */

export type SkillInterface = {
    id: string
    role: string
    description: string
    start_date: string
    finish_date: string
    type: string
    company: string
    company_url: string
    keywords: string[]
    language: string
    order: number
}

export type EditSkillsStructure = {
    index: number
    skill: SkillInterface
}

export type SkillsFetched = {
    skillType: string
    skills: SkillInterface[]
}