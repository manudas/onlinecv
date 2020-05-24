/*
    name: String,
    description: String,
    keywords: [],
    language: String,
    url: String,
    picture: Buffer
*/
module.exports =
    `
  type Portfolio {
    id: ID!
    name: String!,
    description: String,
    keywords: [String]!,
    language: String!,
    url: String,
    """
    picture is String in GraphQL but Buffer in JS
    """
    picture: String
  }

  extend type Query {
    portfolios(language: String!): [Portfolio]!
  }

  extend type Mutation {
    putPortfolio(portfolio: Portfolio!): Portfolio!
    removePortfolio(id: ID!): Boolean!
  }
`;