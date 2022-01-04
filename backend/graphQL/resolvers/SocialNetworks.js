const ObjectId = require('mongodb').ObjectId;
const cleanObject = require('@helpers/utils').cleanObject;

module.exports = {
    Query: {
        socialNetworks: async (
            { language },
            { models: { SocialNetworksModel } },
            info
        ) => {
            const socialNetworkList =
                await SocialNetworksModel.find({
                    language
                })
                    .sort({
                        order: 1
                    })
                    .exec();
            return socialNetworkList;
        }
    },
    Mutation: {
        putSocialNetworks: async (
            { socialNetworks },
            { models: { SocialNetworksModel } },
            info
        ) => {
            const SocialNetworkWriteResult =
                await Promise.all(
                    socialNetworks.map(async (network) => {
                        const cleanedNetwork = cleanObject(
                            network,
                            { id: '_id' }
                        );

                        if (!cleanedNetwork._id) {
                            cleanedNetwork._id =
                                new ObjectId();
                        }

                        const element =
                            await SocialNetworksModel.findOneAndUpdate(
                                { _id: cleanedNetwork._id },
                                cleanedNetwork,
                                {
                                    upsert: true, // if no details found, create a new entry
                                    new: true // return the value of the object after the update and not before
                                }
                            );

                        return element;
                    })
                );
            return SocialNetworkWriteResult
                ? SocialNetworkWriteResult
                : false;
        },
        removeSocialNetwork: async (
            { id },
            { models: { SocialNetworksModel } },
            info
        ) => {
            const WriteResult =
                await SocialNetworksModel.remove(
                    { _id: id },
                    { justOne: true }
                ); // justOne ==> remove one
            if (WriteResult.deletedCount === 1) {
                return id;
            }
            throw new Error(
                'Network cannot be deleted as was not found in database'
            );
        }
    }
};
