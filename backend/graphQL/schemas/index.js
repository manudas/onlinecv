const rootSchema = `
    type Mutation
    type Query
`;

import { join } from 'path';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeSchemas } from '@graphql-tools/schema';
import { fileDirName } from 'app/helpers/utils.js';

const typeDefFiles = await loadFiles(join(fileDirName(import.meta).__dirname, 'definitions'));
typeDefFiles.push(rootSchema);

export default mergeSchemas({typeDefs: typeDefFiles});
