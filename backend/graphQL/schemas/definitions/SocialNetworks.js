/*
    language: String,
    label: String,
    text: String,
    order: Number
*/
export default
    `
  type SocialNetwork {
    _id: ID!
    language: String!,
    label: String!,
    description: String,
    url: String!,
    keywords: [String],
    order: Int!
  }

  input SocialNetworkInput {
    id: ID
    language: String!,
    label: String!,
    description: String,
    url: String!,
    keywords: [String],
    order: Int!
  }

  extend type Query {
    socialNetworks(language: String!): [SocialNetwork]!
  }

  extend type Mutation {
    putSocialNetworks(socialNetworks: [SocialNetworkInput]!): [SocialNetwork]!
    removeSocialNetwork(id: ID!): ID
  }
`;