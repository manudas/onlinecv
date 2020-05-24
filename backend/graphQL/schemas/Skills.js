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
module.exports =
    `
  enum RelatedKnowledge {
    """
    TO BE FILLED WITH MORE
    """
    RegulatedTraining,
  }

  type Skill {
    id: ID!
    name: String!,
    description: String,
    skill_level: Int,
    related_knowledge: [RelatedKnowledge]!,
    type: String,
    developed_projects: [String]!,
    keywords: [String]!,
    language: String!
  }

  extend type Query {
    skills(language: String!): [Skill]!
  }

  extend type Mutation {
    putSkill(skill: Skill!): Skill!
    removeSkill(id: ID!): Boolean!
  }
`;