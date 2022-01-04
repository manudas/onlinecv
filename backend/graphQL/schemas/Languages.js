/*
    name: String,
    certification: String,
    type: String,
    school: String,
    school_url: String,
    written_level: Number,
    spoken_level: Number,
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
    written_level: Int,
    spoken_level: Int,
    keywords: [String]!,
    language: String!,
    order: Int!
  }

  input LanguageInput {
    id: ID
    name: String!,
    certification: String,
    school: String,
    school_url: String,
    written_level: Int,
    spoken_level: Int,
    keywords: [String]!,
    language: String!,
    order: Int!
  }

  extend type Query {
    languages(language: String!): [Language]
  }

  extend type Mutation {
    putLanguages(languages: [LanguageInput]!): [Language]!
    removeLanguage(id: ID!): Boolean!
  }
`;