export enum TrainingType {
    all,
    official,
    computer,
    other
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
            average_grade: Float,
            keywords: [String]!,
            language: String!
        }

 */

export type TrainingInterface = {
    id?: string
    tag: string
    language: string
    description?: string
    type: string
    school?: string
    school_url?: string
    start_date?: Date
    finish_date?: Date
    final_project?: String,
    average_grade?: number,
    keywords: string[]
    order: number
}

export type EditTrainingStructure = {
    index: number
    training: TrainingInterface
}

export type TrainingFetched = {
    trainingType: string
    Trainings: TrainingInterface[]
}