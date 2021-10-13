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
    _id: ID!
    description: String,
    type: String!,
    start_date: String,
    finish_date: String,
    role: String!,
    company: String,
    company_url: String,
    keywords: [String],
    language: String!,
    order: Int!
  }

  input WorkExperienceInput {
    id: ID
    description: String,
    type: String!,
    start_date: String,
    finish_date: String,
    role: String!,
    company: String,
    company_url: String,
    keywords: [String],
    language: String!,
    order: Int!
  }

  extend type Query {
    Experiences(language: String!, type: String!): [WorkExperience]!
    allExperiences(language: String!): [WorkExperience]!
  }

  extend type Mutation {
    putWorkExperience(workExperiences: [WorkExperienceInput]!): [WorkExperience]!
    removeWorkExperience(id: ID!): Boolean!
  }
`;