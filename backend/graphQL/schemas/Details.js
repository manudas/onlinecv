import {
    gql
} from 'apollo-server';
/*
    name: String,
    surname: String,
    address: String,
    // phone_number could be a number but also include digits shuch as + or -
    phone_number: String,
    birth_date: Date, // date
    email: String,
    // qr_code: String, // qr_code will be made on the fly
    keywords: [],
    language: String,
    primaryJobName: String,
    secondaryJobName: String,
    nickname: String
*/
export default gql
    `
  type Details {
    id: ID!
    name: String!
    surname: String
    address: String
    phone_number: String
    birth_date: String
    email: String
    """
    // qr_code: String, // qr_code will be made on the fly
    """
    keywords: [String]!
    language: String!
    primaryJobName: String!
    secondaryJobName: String
    nickname: String
  }

  type Query {
    details(language: String!): Details!
  }

  type Mutation {
    putDetails(Details!): Details!
  }
`;