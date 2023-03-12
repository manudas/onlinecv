/*
    name: String,
    description: String,
    keywords: [],
    language: String
*/
export default
    `
  type Interest {
    id: ID!
    name: String!
    description: String
    keywords: [String]!
    language: String!
  }

  input InterestInput {
    id: ID
    name: String!
    description: String
    keywords: [String]!
    language: String!
  }

  extend type Query {
    interests(language: String!): [Interest]!
  }

  extend type Mutation {
    putInterest(interest: InterestInput!): Interest!
    removeInterest(id: ID!): Boolean!
  }
`;