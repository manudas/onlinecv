// import { AuthenticationError } from 'apollo-server';
module.exports = {
    Query: {
        languages: async({
            language
        }, {
            models: {
                ProfileDetailsModel
            },
        }, info) => {
            const profileDetailsList = await ProfileDetailsModel.find({
                language
            }).sort({
                order: 1
            }).exec();
            return profileDetailsList;
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
        putProfileDetail: async(parent, {
            ProfileDetails,
        }, {
            models: {
                profileDetailsModel
            },
        }, info) => {
            const WriteResult = await profileDetailsModel.update({
                id: ProfileDetails.id,
            }, ProfileDetails, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? ProfileDetails : false;
        },
        removeProfileDetail: async(parent, {
            id,
        }, {
            models: {
                profileDetailsModel
            },
        }, info) => {
            const WriteResult = await profileDetailsModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};