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
    Training,
  }

  type Skill {
    _id: ID!
    tag: String!,
    description: String,
    skill_level: Int,
    related_knowledge: [RelatedKnowledge],
    type: String,
    developed_projects: [String],
    keywords: [String],
    language: String!,
    order: Int!
  }

  input SkillInput {
    id: ID
    tag: String!,
    description: String,
    skill_level: Int,
    related_knowledge: [RelatedKnowledge],
    type: String,
    developed_projects: [String],
    keywords: [String],
    language: String!,
    order: Int!
  }

  extend type Query {
    Skills(language: String!, type: String!): [Skill]
  }

  extend type Mutation {
    putSkills(skills: [SkillInput]!): [Skill]!
    removeSkill(id: ID!): Boolean!
  }
`;