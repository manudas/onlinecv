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

  extend type Query {
    resume(language: String!): Resume
  }

  extend type Mutation {
    putResume(resume: Resume!): Resume!
    removeResume(id: ID!): Boolean!
  }
`;