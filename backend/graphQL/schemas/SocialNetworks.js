/*
    language: String,
    label: String,
    text: String,
    order: Number
*/
export default `
  type SocialNetwork {
    id: ID!
    language: String!,
    label: String!,
    text: String,
    order: Int!
  }

  extend type Query {
    socialNetworks(language: String!): [SocialNetwork]!
  }

  extend type Mutation {
    putSocialNetwork(SocialNetwork!): SocialNetwork!
    removeSocialNetwork(id: ID!): Boolean!
  }
`;