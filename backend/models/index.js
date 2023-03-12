import fs from 'fs';
import path from 'path';
import { fileDirName } from 'app/helpers/utils.js';

const models = {};
const __dirname = fileDirName(import.meta).__dirname;
await Promise.all(fs.readdirSync(__dirname).map(async function(file) {
    // let's not include this same file
    if (file !== path.parse(fileDirName(import.meta).__filename).base) {
        const fileContent = await import(`./${file}`);
        // To end up, let's export the content
        Object.assign(models, fileContent);
    }
}));

export default models;