import bcrypt from 'bcrypt';
import { authGuard, checkUserExists, generateToken, getToken, getUser, userExistsGuard, tokenGuard } from 'app/helpers/auth.js';

export default {
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
            return await checkUserExists();
        },
        adminUser: async (
            _parent,
            _params,
            _context,
            _info
        ) => {
            const userObject = await getUser();
            return userObject.value.username;
        },
    },
    Mutation: {
        authentication: async ( // sign up
            _parent,
            { authenticationData },
            _context,
            _info
        ) => {
            const { username, password, rememberMe } = authenticationData;
            await authGuard(username, password);

            const token = await generateToken(username, rememberMe);
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
            const { username, rememberMe } = authenticationData;

            // hashing password
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(authenticationData.password, salt);

            const data = {
                key: 'adminUser',
                value: {
                    username,
                    password
                }
            }
            const document = new ConfigModel(data);
            await document.save();

            const token = await generateToken(username, rememberMe);
            return {
                token,
                authenticated: true
            };
        }
    }
};