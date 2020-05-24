module.exports = {
    Query: {
        socialNetworks: async(parent, {
            language
        }, {
            models: {
                socialNetworksModel
            },
        }, info) => {
            const socialNetworkList = await socialNetworksModel.findById({
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
        putSocialNetwork: async(parent, {
            SocialNetwork,
        }, {
            models: {
                socialNetworksModel
            },
        }, info) => {
            const WriteResult = await socialNetworksModel.update({
                id: SocialNetwork.id,
            }, SocialNetwork, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? SocialNetwork : false;
        },
        removeSocialNetwork: async(parent, {
            id,
        }, {
            models: {
                socialNetworksModel
            },
        }, info) => {
            const WriteResult = await socialNetworksModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};