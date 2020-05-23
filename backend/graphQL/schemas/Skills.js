/*
    name: String,
    description: String,
    skill_level: Number,
    related_knowledge: {}, // subquery ?
    type: String,
    developed_projects: [],
    keywords: [],
    language: String
*/
export default `
  type Skill {
    id: ID!
    name: String!,
    description: String,
    skill_level: Int,
    related_knowledge: [],
    type: String,
    developed_projects: [],
    keywords: [],
    language: String!
  }

  extend type Query {
    skills(language: String!): [Skill]!
  }

  extend type Mutation {
    putSkill(Skill!): Skill!
    removeSkill(id: ID!): Boolean!
  }
`;