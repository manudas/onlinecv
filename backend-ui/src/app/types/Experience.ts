export enum ExperienceType {
    all,
    professional,
    ong,
    other
}

/*
 * GraphQL Schema

          type WorkExperience {
            id: ID!
            name: String!,
            description: String,
            start_date: String,
            finish_date: String,
            role: String,
            company: String,
            company_url: String,
            keywords: [String]!,
            details: [String],
            language: String!
        }

 */

export type ExperienceInterface = {
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
    details: string[]
    order: number
}

export type EditExperienceStructure = {
    index: number
    experience: ExperienceInterface
}

export type ExperienceFetched = {
    experienceType: string
    experiences: ExperienceInterface[]
}