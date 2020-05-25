const fs = require('fs');
const path = require('path');

module.exports = {};

fs.readdirSync(__dirname).forEach(function(file) {
    // let's not include this same file
    if (file !== path.parse(__filename).base) {
        const filename = path.parse(file).name;
        const fileContent = require(`./${filename}`);

        // To end up, let's export the content
        Object.assign(module.exports, fileContent);
    }
});