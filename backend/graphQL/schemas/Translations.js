/*
    language: String,
    module: String,
    tag: String,
    text: String
*/
module.exports =
    `
      type Translation {
        _id: ID!
        language: String!,
        module: String,
        tag: String!,
        text: String!
      }

      input TranslationInput {
        _id: ID
        language: String!,
        module: String,
        tag: String!,
        text: String!
      }

      extend type Query {
        translations(tags: [String!]!, modules: [String!]!, language: String!): [Translation]!
        translation(tag: String!, module: String, language: String!): Translation
      }

      extend type Mutation {
        putTranslation(translation: TranslationInput!): Translation!
        removeTranslation(id: ID!): Boolean!
      }
    `;