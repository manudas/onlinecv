/*
    name: String,
    description: String,
    keywords: [],
    language: String,
    url: String,
    picture: Buffer
*/
export default
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
    picture: [String]
  }

  input PortfolioInput {
    id: ID
    name: String!,
    description: String,
    keywords: [String]!,
    language: String!,
    url: String,
    """
    picture is String in GraphQL but Buffer in JS
    """
    picture: [String]
  }

  extend type Query {
    portfolio(language: String!): [Portfolio]!
  }

  extend type Mutation {
    putPortfolio(portfolio: PortfolioInput!): Portfolio!
    removePortfolio(id: ID!): Boolean!
  }
`;