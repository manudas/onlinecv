const fs = require('fs');
const path = require('path');

const rootSchema = `
    type Mutation
    type Query
`;

let fullSchema = rootSchema;

fs.readdirSync(__dirname).forEach(function(file) {
    // let's not include this same file
    if (file !== path.parse(__filename).base) {
        const filename = path.parse(file).name;
        const fileContent = require(`./${filename}`);
        module[`${filename}Schema`] = fileContent;
        fullSchema += `\n${fileContent}`;
    }
});

module.exports = fullSchema;