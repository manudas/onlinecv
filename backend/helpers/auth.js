
const jsonwebtoken = require("jsonwebtoken");
const { randomBytes } = require('crypto');

const bcrypt = require('bcrypt');
const { ConfigModel } = require('@models/Config');
const { GraphQLError } = require('graphql');

const checkUserPassword = async (user, password) => {
    let validPassword = false;
    const db_User = await ConfigModel.findOne({
        '$and': [
            { key: 'adminUser'},
            { 'value.user': user }
        ]
    });

    if (db_User) {
        validPassword = await bcrypt.compare(password, db_User.password);
    }

    return {
        validUser: !!db_User,
        validPassword
    }
}

const checkUserExists = async () => {
    const db_User = await ConfigModel.findOne({ key: 'adminUser'});

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
        verified = jsonwebtoken.verify(token, jwtSecret);
    } catch (error) {
        verified = false
        if (throwError) {
            badCredentialsGraphQL_Error();
        }
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

const generateToken = async (user) => {
    const jwtSecret = await getJwtSecret();
    return jsonwebtoken.sign({ user }, jwtSecret)
}

module.exports = {
    authGuard,
    badCredentialsGraphQL_Error,
    badUserGraphQL_Error,
    checkUserExists,
    checkUserPassword,
    generateToken,
    getToken,
    tokenGuard,
    userExistsGuard,
};