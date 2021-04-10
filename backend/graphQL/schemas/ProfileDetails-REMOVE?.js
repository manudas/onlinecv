/*
    language: String,
    label: String,
    text: String,
    order: Number
*/
module.exports =
    `
  type ProfileDetail {
    id: ID!
    language: String!,
    label: String!,
    text: String,
    keywords: [String]!,
    order: Int!
  }

  input ProfileDetailInput {
    id: ID
    language: String!,
    label: String!,
    text: String,
    keywords: [String]!,
    order: Int!
  }

  extend type Query {
    profileDetails(language: String!): [ProfileDetail]!
  }

  extend type Mutation {
    putProfileDetail(profileDetail: ProfileDetailInput!): ProfileDetail!
    removeProfileDetail(id: ID!): Boolean!
  }
`;