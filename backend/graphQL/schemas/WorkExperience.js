/*
    name: String,
    description: String,
    start_date: Date,
    finish_date: Date,
    role: String,
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
    role: String,
    company: String,
    company_url: String,
    keywords: [String]!,
    language: String!,
    order: Int!
  }

  input WorkExperienceInput {
    id: ID
    name: String!,
    description: String,
    start_date: String,
    finish_date: String,
    role: String,
    company: String,
    company_url: String,
    keywords: [String]!,
    language: String!,
    order: Int!
  }

  extend type Query {
    workExperiences(language: String!): [WorkExperience]!
  }

  extend type Mutation {
    putWorkExperience(workExperience: WorkExperienceInput!): WorkExperience!
    removeWorkExperience(id: ID!): Boolean!
  }
`;