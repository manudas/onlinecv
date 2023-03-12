import { getAdminFolder } from 'app/helpers/utils.js';

export default {
    Query: {
        baseUrl: async () => {
            const adminFolder = await getAdminFolder();
            return adminFolder?.value ?? 'admin';
        },
    },
}