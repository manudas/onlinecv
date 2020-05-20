import {
    gql
} from 'apollo-server';
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
export default gql
    `
  type RegulatedTraining {
    id: ID!
    name: String!,
    description: String,
    type: String,
    school: String,
    start_date: String,
    finish_date: String,
    final_project: String,
    school_url: String,
    average_school: Float,
    keywords: [],
    language: String!
  }

  type Query {
    regulatedTraining(id: ID!, language: String!): RegulatedTraining
    regulatedTrainings(language: String!): [RegulatedTraining]!
  }

  type Mutation {
    putRegulatedTraining(RegulatedTraining!): RegulatedTraining!
    removeRegulatedTraining(id: ID!): Boolean!
  }
`;