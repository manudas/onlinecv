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
module.exports =
    `
      type Locale {
        _id: ID!
        name: String!,
        iso: String!,
        default: Boolean
      }

      input LocaleInput {
        _id: ID
        name: String!,
        iso: String!,
        default: Boolean
      }

      extend type Query {
        getLocales: [Locale]!
      }

      extend type Mutation {
        putLocale(translation: LocaleInput!): Locale!
        removeLocale(_id: ID!): Boolean!
      }
    `;