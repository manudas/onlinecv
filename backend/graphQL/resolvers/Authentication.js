var bcrypt = require('bcrypt');
const { authGuard, checkUserExists, generateToken, getToken, userExistsGuard, tokenGuard } = require('@helpers/auth');

module.exports = {
    Query: {
        checkToken: async (
            _parent,
            _params,
            { request },
            _info
        ) => {
            const token = getToken(request);
            return {
                token,
                authenticated: !!await tokenGuard(request, false), // false to not throw error but return if authenticated instead
            }
        },
        checkAdminUserExists: async (
            _parent,
            _params,
            _context,
            _info
        ) => {
            functi();
            return await checkUserExists();
        },
    },
    Mutation: {
        authentication: async ( // sign up
            _parent,
            { authenticationData },
            _context,
            _info
        ) => {
            const { username, password } = authenticationData;
            await authGuard(username, password);

            const token = await generateToken(username);
            return {
                token,
                authenticated: true
            };
        },
        signup: async ( // sing in
            _parent,
            { authenticationData },
            { models: { ConfigModel } },
            _info
        ) => {
            await userExistsGuard();
            const { username } = authenticationData;

            // hashing password
            const salt = await bcrypt.genSalt(10);
            authenticationData.password = await bcrypt.hash(authenticationData.password, salt);

            const data = {
                key: 'adminUser',
                value: authenticationData
            }
            const document = new ConfigModel(data);
            await document.save();

            const token = await generateToken(username);
            return {
                token,
                authenticated: true
            };
        }
    }
}