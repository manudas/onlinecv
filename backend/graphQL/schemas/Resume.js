import {
    gql
} from 'apollo-server';
/*
    resume: String,
    keywords: [],
    language: String
*/
export default gql
    `
  type Resume {
    id: ID!
    resume: String!
    keywords: [String]!
    language: String!
  }

  type Query {
    resume(language: String!): Resume
  }

  type Mutation {
    putResume(Resume!): Resume!
    removeResume(id: ID!): Boolean!
  }
`;