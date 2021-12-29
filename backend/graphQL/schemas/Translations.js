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
        domain: String,
        module: String,
        tag: String!,
        text: String
        lastTimeFetched: String,
        missing: Boolean,
        accessCounter: Int
      }

      input TranslationInput {
        id: ID
        language: String!,
        domain: String,
        module: String,
        tag: String!,
        text: String!
      }

      extend type Query {
        translations(tags: [String!]!, modules: [String!]!, language: String!, domain: String): [Translation]!
        missingTranslations(language: String!): [Translation]!
      }

      extend type Mutation {
        putTranslation(translation: TranslationInput!): Translation!
        removeTranslation(id: ID!): Boolean!
      }
    `;