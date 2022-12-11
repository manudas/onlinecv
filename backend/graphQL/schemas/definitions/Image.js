/*
    value: Buffer,
    key: String
*/
module.exports =
    `
  type Image {
    id: ID!
    key: String!
    """
    value is a buffer, but a string in GraphQL Schema
    """
    value: String!
  }

  input ImageInput {
    id: ID
    key: String!
    """
    value is a buffer, but a string in GraphQL Schema
    """
    value: String!
  }

  extend type Query {
    image(key: String!): Image
  }

  extend type Mutation {
    putImage(image: ImageInput!): Image!
    removeImage(id: ID!): Boolean!
  }
`;