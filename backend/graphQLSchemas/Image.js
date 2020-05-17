import {
    gql
} from 'apollo-server';
/*
    value: Buffer,
    key: String
*/
export default gql
    `
  type Image {
    id: ID!
    key: String!
    """
    value is a buffer, but a string in GraphQL Schema
    """
    value: String!
  }

  type Query {
    image(key: String!): Image
  }

  type Mutation {
    putImage(Image!): Image!
    removeImage(id: ID!): Boolean!
  }
`;