
const jsonwebtoken = require("jsonwebtoken");
const { randomBytes } = require('crypto');

const bcrypt = require('bcrypt');
const { ConfigModel } = require('@models/Config');
const { GraphQLError } = require('graphql');

const getUser = async (username = null) => {
    return await ConfigModel.findOne(
        username ?
            {
                '$and': [
                    { key: 'adminUser'},
                    { 'value.username': username }
                ]
            }
            : { key: 'adminUser'}
    );
}

const checkUserPassword = async (username, password) => {
    const db_User = await getUser(username);

    let validPassword = false;
    if (db_User.value) {
        validPassword = await bcrypt.compare(password, db_User.value.password);
    }

    return {
        validUser: !!db_User,
        validPassword
    }
}

/**
 * Checks whether the user exists or not
 * If the user param is not provided it
 * checks for the existence of the admin user
 *
 * @param { string } user Optional, the username
 * to be checked
 *
 * @returns true if user or admin user exists,
 * false otherwise
 */
const checkUserExists = async (username = null) => {
    const db_User = await getUser(username);
    return !!db_User;
}

const badCredentialsGraphQL_Error = () => {
    throw new GraphQLError('Invalid credentials', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    });
}

const badUserGraphQL_Error = () => {
    throw new GraphQLError('No user found with those credentials', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    });
}

const authGuard = async (user, password) => {
    const { validUser, validPassword } = await checkUserPassword(user, password);

    if (!validUser) badUserGraphQL_Error();
    if (!validPassword) badCredentialsGraphQL_Error();
}

const getToken = (request) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    return token;
}

const tokenGuard = async (request, throwError = true) => {
    const token = getToken(request);

    if (token == null && throwError) badCredentialsGraphQL_Error();
    else if (token == null && !throwError) return false

    const jwtSecret = await getJwtSecret();

    let verified = false
    try {
        const token_values = jsonwebtoken.verify(token, jwtSecret);
        verified = await checkUserExists(token_values.username)
    } catch (error) {
        verified = false
    }

    if (!verified && throwError) {
        badCredentialsGraphQL_Error();
    }

    return verified
}

const userExistsGuard = async () => {
    const userExists = await checkUserExists();
    if (userExists) {
        throw new GraphQLError('Not allowed', {
            extensions: {
                code: 'USER_EXISTS',
            },
        });
    }
}

const getJwtSecret = async () => {
    let jwtSecret = await ConfigModel.findOne({ key: 'jwtSecret' });
    if(!jwtSecret) {
        jwtSecret = randomBytes(64).toString('hex');
        const document = new ConfigModel({
            key: 'jwtSecret',
            value: jwtSecret
        });
        await document.save();
    }
    return jwtSecret.value;
}

const generateToken = async (username, rememberMe = false) => {
    const jwtSecret = await getJwtSecret();
    // We remember the user a minimum of 20 minutes, even if the rememberMe parameter is not set
    return jsonwebtoken.sign({ username }, jwtSecret, {...(rememberMe ? {} : { expiresIn: '20 minutes' }) })
}

module.exports = {
    authGuard,
    badCredentialsGraphQL_Error,
    badUserGraphQL_Error,
    checkUserExists,
    checkUserPassword,
    generateToken,
    getToken,
    getUser,
    tokenGuard,
    userExistsGuard,
};