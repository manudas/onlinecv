// const fs = require('fs');
// const path = require('path');

const rootSchema = `
    type Mutation
    type Query
`;

const { join } = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeSchemas } = require('@graphql-tools/schema')

const typeDefFiles = loadFilesSync(join(__dirname, 'definitions/*'))
typeDefFiles.push(rootSchema)

module.exports = mergeSchemas({typeDefs: typeDefFiles})









/*


const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});


*/


















// creo q habra q cambiar por otro tipo de schema con resolvers incluidos -> https://github.com/graphql/graphql-http borrar por lo tanto todas librerías graphql-tools si no son necesarias (estudiar)
// tal vez no haga falta si podemos hacer un
// const executableSchema = makeExecutableSchema({
//     typeDefs,
//     resolvers,
//   })

//   y pasarlo en schema (sin usar rootResolver)