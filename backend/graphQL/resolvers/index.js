const fs = require('fs');
const path = require('path');

module.exports = {};

fs.readdirSync(__dirname).forEach(function(file) {
    // let's not include this same file
    if (file !== path.parse(__filename).base) {
        const filename = path.parse(file).name;
        const fileContent = require(`./${filename}`);
        // Let's export individual resolvers by name
        module[`${filename}Resolver`] = fileContent;
        // Lets include it in the list of all resolvers (default export)
        module.exports[`${filename}Resolver`] = fileContent;
    }
});