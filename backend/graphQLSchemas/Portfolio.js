import {
    gql
} from 'apollo-server';
/*
    name: String,
    description: String,
    keywords: [],
    language: String,
    url: String,
    picture: Buffer
*/
export default gql
    `
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

  type Query {
    portfolio(id: ID!, language: String!): Portfolio
    portfolios(language: String!): [Portfolio]!
  }

  type Mutation {
    putPortfolio(Portfolio!): Portfolio!
    removePortfolio(id: ID!): Boolean!
  }
`;