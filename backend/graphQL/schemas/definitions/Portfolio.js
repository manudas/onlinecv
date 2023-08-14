export default
    `
  type Portfolio {
    _id: ID!
    name: String!
    description: String!
    keywords: [String]
    language: String!
    order: Int!
    """
    picture is String in GraphQL but Buffer in JS
    """
    pictures: [Picture]!
    url: String
  }

  input PortfolioInput {
    id: ID
    name: String!
    description: String!
    keywords: [String]
    language: String!
    order: Int!
    """
    picture is String in GraphQL but Buffer in JS
    """
    pictures: [PictureInput]!
    url: String
  }

  extend type Query {
    portfolio(language: String!): [Portfolio]!
  }

  extend type Mutation {
    putPortfolio(portfolio: [PortfolioInput]!): [Portfolio]!
    removePortfolio(id: ID!): Boolean!
  }
`;