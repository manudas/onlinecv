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
  type ProfileDetail {
    id: ID!
    language: String!,
    label: String!,
    text: String,
    order: Number!
  }

  type Query {
    profileDetail(id: ID!, language: String!): ProfileDetail
    profileDetails(language: String!): [ProfileDetail]!
  }

  type Mutation {
    putProfileDetail(ProfileDetail!): ProfileDetail!
    removeProfileDetail(id: ID!): Boolean!
  }
`;