/*
    name: String,
    description: String,
    keywords: [],
    language: String
*/
module.exports =
    `
  type Interest {
    id: ID!
    name: String!
    description: String
    keywords: [String]!
    language: String!
  }

  extend type Query {
    interests(language: String!): [Interest]!
  }

  extend type Mutation {
    putInterest(interest: Interest!): Interest!
    removeInterest(id: ID!): Boolean!
  }
`;