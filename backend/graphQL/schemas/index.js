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