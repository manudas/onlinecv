/*
    language: String,
    label: String,
    text: String,
    order: Number
*/
module.exports =
    `
  type SocialNetwork {
    id: ID!
    language: String!,
    label: String!,
    text: String,
    keywords: [String]!,
    order: Int!
  }

  extend type Query {
    socialNetworks(language: String!): [SocialNetwork]!
  }

  extend type Mutation {
    putSocialNetwork(socialNetwork: SocialNetwork!): SocialNetwork!
    removeSocialNetwork(id: ID!): Boolean!
  }
`;