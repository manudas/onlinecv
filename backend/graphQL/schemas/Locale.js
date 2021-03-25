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
        id: ID!
        name: String!,
        iso: String!
      }

      input LocaleInput {
        id: ID
        name: String!,
        iso: String!
      }

      extend type Query {
        getLocales: [Locale]!
      }

      extend type Mutation {
        putLocale(translation: LocaleInput!): Locale!
        removeLocale(id: ID!): Boolean!
      }
    `;