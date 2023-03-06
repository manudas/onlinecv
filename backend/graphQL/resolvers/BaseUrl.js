const { getAdminFolder } = require('@helpers/utils');

module.exports = {
    Query: {
        baseUrl: async () => {
            const adminFolder = await getAdminFolder();
            return adminFolder?.value ?? 'admin';
        },
    },
}