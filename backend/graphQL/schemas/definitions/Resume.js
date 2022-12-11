/*
    resume: String,
    keywords: [],
    language: String
*/
module.exports =
    `
  type Resume {
    id: ID!
    resume: String!
    keywords: [String]!
    language: String!
  }

  input ResumeInput {
    id: ID
    resume: String!
    keywords: [String]!
    language: String!
  }

  extend type Query {
    resume(language: String!): Resume
  }

  extend type Mutation {
    putResume(resume: ResumeInput!): Resume!
    removeResume(id: ID!): Boolean!
  }
`;