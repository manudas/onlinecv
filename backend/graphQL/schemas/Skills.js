import {
    gql
} from 'apollo-server';
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
export default gql
    `
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

  type Query {
    skills(language: String!): [Skill]!
    skill(id: ID!, language: String!): Skill
  }

  type Mutation {
    putSkill(Skill!): Skill!
    removeSkill(id: ID!): Boolean!
  }
`;