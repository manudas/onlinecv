/*
    language: String,
    module: String,
    tag: String,
    text: String
*/
export default `
  type Translation {
    id: ID!
    language: String!,
    module: String,
    tag: String!,
    text: String!
  }

  extend type Query {
    translations(language: String!): [Translation]!
    translation(tag: string!, module: string, language: String!): Translation
  }

  extend type Mutation {
    putTranslation(Translation!): Translation!
    removeTranslation(id: ID!): Boolean!
  }
`;