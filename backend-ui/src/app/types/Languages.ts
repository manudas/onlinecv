
/*
 * GraphQL Schema

    type Language {
        _id: ID!
        name: String!,
        certification: String,
        school: String,
        school_url: String,
        written_level: Int,
        spoken_level: Int,
        keywords: [String]!,
        language: String!,
        order: Int!
    }
 */

export type LanguageInterface = {
    id: string
    name: string
    certification: string
    school: string
    school_url: string

    written_level: number
    spoken_level: number

    keywords: string[]
    language: string
    order: number
}

export type EditLanguageStructure = {
    index: number
    language: LanguageInterface
}

export type LanguagesFetched = {
    languages: LanguageInterface[]
}