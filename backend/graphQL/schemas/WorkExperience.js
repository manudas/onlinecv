/*
    name: String,
    description: String,
    start_date: Date,
    finish_date: Date,
    post: String,
    company: String,
    company_url: String,
    keywords: [],
    language: String
*/
module.exports =
    `
  type WorkExperience {
    id: ID!
    name: String!,
    description: String,
    start_date: String,
    finish_date: String,
    post: String,
    company: String,
    company_url: String,
    keywords: [String]!,
    language: String!
  }

  extend type Query {
    workExperiences(language: String!): [WorkExperience]!
  }

  extend type Mutation {
    putWorkExperience(workExperience: WorkExperience!): WorkExperience!
    removeWorkExperience(id: ID!): Boolean!
  }
`;