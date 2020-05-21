import {
    gql
} from 'apollo-server';
/*
    name: String,
    description: String,
    start_date: Date,
    finish_date: Date,
    post: String,
    company: String,
    company_url: String,
    keywords: [],
    language: String
*/
export default gql
    `
  type WorkExperience {
    id: ID!
    name: String!,
    description: String,
    start_date: String,
    finish_date: String,
    post: String,
    company: String,
    company_url: String,
    keywords: [String],
    language: String!
  }

  type Query {
    workExperiences(language: String!): [WorkExperience]!
  }

  type Mutation {
    putWorkExperience(WorkExperience!): WorkExperience!
    removeWorkExperience(id: ID!): Boolean!
  }
`;