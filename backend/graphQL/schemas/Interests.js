import {
    gql
} from 'apollo-server';
/*
    name: String,
    description: String,
    keywords: [],
    language: String
*/
export default gql
    `
  type Interest {
    id: ID!
    name: String!
    description: String
    keywords: [String]!
    language: String!
  }

  type Query {
    interests(language: String!): [Interest]!
  }

  type Mutation {
    putInterest(Interest!): Interest!
    removeInterest(id: ID!): Boolean!
  }
`;