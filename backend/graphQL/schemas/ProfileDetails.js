/*
    language: String,
    label: String,
    text: String,
    order: Number
*/
export default `
  type ProfileDetail {
    id: ID!
    language: String!,
    label: String!,
    text: String,
    order: Number!
  }

  extend type Query {
    profileDetails(language: String!): [ProfileDetail]!
  }

  extend type Mutation {
    putProfileDetail(ProfileDetail!): ProfileDetail!
    removeProfileDetail(id: ID!): Boolean!
  }
`;