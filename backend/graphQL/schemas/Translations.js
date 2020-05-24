/*
    language: String,
    module: String,
    tag: String,
    text: String
*/
module.exports =
    `
  type Translation {
    id: ID!
    language: String!,
    module: String,
    tag: String!,
    text: String!
  }

  extend type Query {
    translations(language: String!): [Translation]!
    translation(tag: String!, module: String, language: String!): Translation
  }

  extend type Mutation {
    putTranslation(translation: Translation!): Translation!
    removeTranslation(id: ID!): Boolean!
  }
`;