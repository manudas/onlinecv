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
export default `
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

  extend type Query {
    languages(language: String!): [Language]!
  }

  extend type Mutation {
    putLanguage(Language!): Language!
    removeLanguage(id: ID!): Boolean!
  }
`;