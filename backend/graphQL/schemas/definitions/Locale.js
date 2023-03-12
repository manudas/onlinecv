/*
 * FILE FOR DEFINE SCHEMA IN
 * GraphQL LIBRARY, NOT MONGODB
 */
/*
    language: String,
    module: String,
    tag: String,
    text: String
*/
export default
    `
      type Locale {
        _id: ID!
        name: String!,
        iso: String!,
        flag: String,
        default: Boolean
      }

      input LocaleInput {
        _id: ID
        name: String!,
        iso: String!,
        flag: String,
        default: Boolean
      }

      extend type Query {
        locales: [Locale]!
      }

      extend type Mutation {
        putLocale(translation: LocaleInput!): Locale!
        removeLocale(_id: ID!): Boolean!
      }
    `;