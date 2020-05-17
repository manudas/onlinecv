import {
    gql
} from 'apollo-server';
/*
    language: String,
    module: String,
    tag: String,
    text: String
*/
export default gql
    `
  type Translation {
    id: ID!
    language: String!,
    module: String,
    tag: String!,
    text: String!
  }

  type Query {
    translations(language: String!): [Translation]!
    translation(id: ID!, language: String!): Translation
  }

  type Mutation {
    putTranslation(Translation!): Translation!
    removeTranslation(id: ID!): Boolean!
  }
`;