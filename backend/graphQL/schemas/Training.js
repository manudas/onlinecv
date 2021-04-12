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
    id: ID!
    tag: String!,
    description: String,
    type: String!,
    school: String,
    start_date: String,
    finish_date: String,
    final_project: String,
    school_url: String,
    average_school: Float,
    keywords: [String]!,
    language: String!,
    order: Int!
  }

  input TrainingInput {
    id: ID
    tag: String!,
    description: String,
    type: String!,
    school: String,
    start_date: String,
    finish_date: String,
    final_project: String,
    school_url: String,
    average_school: Float,
    keywords: [String]!,
    language: String!,
    order: Int!
  }

  extend type Query {
    Trainings(language: String!): [Training]!
  }

  extend type Mutation {
    putTraining(Training: TrainingInput!): Training!
    removeTraining(id: ID!): Boolean!
  }
`;