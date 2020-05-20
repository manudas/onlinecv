import {
    gql
} from 'apollo-server';
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
export default gql
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

  type Query {
    languages(language: String!): [Language]!
  }

  type Mutation {
    putLanguage(Language!): Language!
    removeLanguage(id: ID!): Boolean!
  }
`;