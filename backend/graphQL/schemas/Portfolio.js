/*
    name: String,
    description: String,
    keywords: [],
    language: String,
    url: String,
    picture: Buffer
*/
export default `
  type Portfolio {
    id: ID!
    name: String!,
    description: String,
    keywords: [],
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
    putPortfolio(Portfolio!): Portfolio!
    removePortfolio(id: ID!): Boolean!
  }
`;