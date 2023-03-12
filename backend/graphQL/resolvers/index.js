import fs from 'fs';
import path from 'path';
import { fileDirName } from 'app/helpers/utils.js';

const resolvers = {};
const __dirname = fileDirName(import.meta).__dirname;
await Promise.all(fs.readdirSync(__dirname).map(async function(file) {
    // let's not include this same file
    if (file !== path.parse(fileDirName(import.meta).__filename).base) {
        const filename = path.parse(file).name;
        const fileContent = (await import(`./${file}`)).default;
        // Lets include it in the list of all resolvers (default export)
        resolvers[`${filename}Resolver`] = fileContent;
    }
}));

export default resolvers;