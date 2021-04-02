/*
    name: String,
    surname: String,
    address: String,
    // phone_number could be a number but also include digits shuch as + or -
    phone_number: String,
    birth_info: String, // E.g.: 31 Dec 1983 - Jaén, Spain
    email: String,
    // qr_code: String, // qr_code will be made on the fly
    keywords: [],
    language: String,
    primaryJobName: String,
    secondaryJobName: String,
    nickname: String
*/
module.exports =
    `
  type Details {
    _id: ID!
    name: String!
    surname: String
    address: String
    phone: String
    birthInfo: String
    email: String!
    """
    // qr_code: String, // qr_code will be made on the fly
    """
    keywords: [String]
    language: String!
    primaryRole: String!
    secondaryRole: String
    nickname: String
  }

  input DetailsInput {
    id: ID
    name: String!
    surname: String
    address: String
    phone: String
    birthInfo: String
    email: String!
    """
    // qr_code: String, // qr_code will be made on the fly
    """
    keywords: [String]
    language: String!
    primaryRole: String!
    secondaryRole: String
    nickname: String
  }

  extend type Query {
    details(language: String!): Details
  }

  extend type Mutation {
    putDetails(details: DetailsInput!): Details!
  }
`;