// import { AuthenticationError } from 'apollo-server';
export default {
    Query: {
        details: async(parent, {
            language
        }, {
            models: {
                detailsModel
            },
        }, info) => {
            const details = await detailsModel.findById({
                language: language
            }).exec();
            return details;
        },
    },
    Mutation: {
        createUser: async(parent, {
            name,
            password
        }, {
            models: {
                userModel
            }
        }, info) => {
            const user = await userModel.create({
                name,
                password
            });
            return user;
        },
    },
    User: {
        posts: async({
            id
        }, args, {
            models: {
                postModel
            }
        }, info) => {
            const posts = await postModel.find({
                author: id
            }).exec();
            return posts;
        },
    },
};