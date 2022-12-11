// const fs = require('fs');
// const path = require('path');

const rootSchema = `
    type Mutation
    type Query
`;

// let fullSchema = rootSchema;

// fs.readdirSync(__dirname).forEach(function(file) {
//     // let's not include this same file
//     if (file !== path.parse(__filename).base) {
//         const filename = path.parse(file).name;
//         const fileContent = require(`./${filename}`);
//         module[`${filename}Schema`] = fileContent;
//         fullSchema += `\n${fileContent}`;
//     }
// });



const { join } = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeSchemas } = require('@graphql-tools/schema')

const typeDefFiles = loadFilesSync(join(__dirname, 'definitions/*'))
typeDefFiles.push(rootSchema)

module.exports = mergeSchemas({typeDefs: typeDefFiles})