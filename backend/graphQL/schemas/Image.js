/*
    value: Buffer,
    key: String
*/
export default `
  type Image {
    id: ID!
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
    putImage(Image!): Image!
    removeImage(id: ID!): Boolean!
  }
`;