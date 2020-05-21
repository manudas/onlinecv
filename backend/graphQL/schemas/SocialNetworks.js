import {
    gql
} from 'apollo-server';
/*
    language: String,
    label: String,
    text: String,
    order: Number
*/
export default gql
    `
  type SocialNetwork {
    id: ID!
    language: String!,
    label: String!,
    text: String,
    order: Int!
  }

  type Query {
    socialNetworks(language: String!): [SocialNetwork]!
  }

  type Mutation {
    putSocialNetwork(SocialNetwork!): SocialNetwork!
    removeSocialNetwork(id: ID!): Boolean!
  }
`;