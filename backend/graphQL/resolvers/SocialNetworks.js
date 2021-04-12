var ObjectID = require('mongodb').ObjectID;

module.exports = {
    Query: {
        socialNetworks: async({
            language
        }, {
            models: {
                SocialNetworksModel
            },
        }, info) => {
            const socialNetworkList = await SocialNetworksModel.find({
                language
            }).sort({
                order: 1
            }).exec();
            return socialNetworkList;
        },
    },
    Mutation: {
        /* Example
        db.books.update(
            { item: "ZZZ135" },   // Query parameter
            {                     // Replacement document
                item: "ZZZ135",
                stock: 5,
                tags: [ "database" ]
            },
            { upsert: true }      // Options: upsert -> insert document if no ducment found to update
        )
        */
        putSocialNetworks: async({
            socialNetworks
        }, {
            models: {
                SocialNetworksModel
            },
        }, info) => {

            const SocialNetworkWriteResult = await Promise.all(socialNetworks.map(async network => {

                const cleanedNetwork = Object.entries(network).reduce((prev, [currKey, currVal], currIndex) => {
                    if (currVal !== null) { // can be 0
                        prev[currKey !== 'id' ? currKey : '_id'] = currVal;
                    }
                    return prev;
                }, {});

                if (!cleanedNetwork._id) {
                    cleanedNetwork._id = new ObjectID();
                }

                const element = await SocialNetworksModel.findOneAndUpdate(
                    {_id: cleanedNetwork._id}
                ,
                cleanedNetwork, {
                    upsert: true, // if no details found, create a new entry
                    new: true // return the value of the object after the update and not before
                });

                return element;
            }));
            return SocialNetworkWriteResult? SocialNetworkWriteResult : false;
        },
        removeSocialNetwork: async({
            id
        }, {
            models: {
                SocialNetworksModel
            },
        }, info) => {
            const WriteResult = await SocialNetworksModel.remove({ _id: id }, { justOne: true }); // justOne ==> remove one
            if (WriteResult.deletedCount === 1) {
                return id;
            }
            throw new Error('Network cannot be deleted as was not found in database');
        },
    },
};