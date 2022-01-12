/*
    name: String,
    description: String,
    type: String,
    school: String,
    start_date: Date,
    finish_date: Date,
    final_project: String,
    school_url: String,
    average_school: Number,
    keywords: [],
    language: String
*/
module.exports =
    `
  type Training {
    _id: ID!,
    tag: String!,
    description: String,
    type: String!,
    school: String,
    start_date: String,
    finish_date: String,
    final_project: String,
    school_url: String,
    average_grade: Float,
    keywords: [String],
    language: String!,
    order: Int!
  }

  input TrainingInput {
    id: ID,
    tag: String!,
    description: String,
    type: String!,
    school: String,
    start_date: String,
    finish_date: String,
    final_project: String,
    school_url: String,
    average_grade: Float,
    keywords: [String],
    language: String!,
    order: Int!
  }

  extend type Query {
    trainings(language: String!, type: String): [Training]!
  }

  extend type Mutation {
    putTrainings(trainings: [TrainingInput]!): [Training]!
    removeTraining(id: ID!): Boolean!
  }
`;