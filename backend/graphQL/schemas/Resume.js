/*
    resume: String,
    keywords: [],
    language: String
*/
export default `
  type Resume {
    id: ID!
    resume: String!
    keywords: [String]!
    language: String!
  }

  extend type Query {
    resume(language: String!): Resume
  }

  extend type Mutation {
    putResume(Resume!): Resume!
    removeResume(id: ID!): Boolean!
  }
`;