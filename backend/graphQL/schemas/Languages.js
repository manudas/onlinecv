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
    id: ID!
    name: String!,
    certification: String,
    type: String,
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
    type: String,
    school: String,
    school_url: String,
    written_level: String,
    spoken_level: String,
    keywords: [String]!,
    language: String!
  }

  extend type Query {
    languages(language: String!): [Language]!
  }

  extend type Mutation {
    putLanguage(language: LanguageInput!): Language!
    removeLanguage(id: ID!): Boolean!
  }
`;