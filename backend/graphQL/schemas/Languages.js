/*
    name: String,
    certification: String,
    type: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [],
    language: String
*/

module.exports =
    `
  type Language {
    _id: ID!
    name: String!,
    certification: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [String]!,
    language: String!
  }

  input LanguageInput {
    id: ID
    name: String!,
    certification: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [String]!,
    language: String!
  }

  extend type Query {
    Languages(language: String!): [Language]!
  }

  extend type Mutation {
    putLanguages(languages: [LanguageInput]!): [Language]!
    removeLanguage(id: ID!): Boolean!
  }
`;