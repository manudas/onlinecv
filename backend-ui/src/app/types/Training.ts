export enum TrainingType {
    all,
    official,
    computer,
    others
}

/*
 * GraphQL Schema

        type Training {
            id: ID!
            tag: String!,
            description: String,
            type: String,
            school: String,
            start_date: String,
            finish_date: String,
            final_project: String,
            school_url: String,
            average_school: Float,
            keywords: [String]!,
            language: String!
        }

 */

export type TrainingInterface = {
    id?: string
    tag: string
    description?: string
    type: TrainingType
    school?: string
    school_url?: string
    start_date?: Date
    finish_date?: Date
    final_project?: String,
    average_school?: number,
    average_score?: number
    keywords: string[]
}

export type EditTrainingStructure = {
    index: number
    training: TrainingInterface
}