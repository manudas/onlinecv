// import { AuthenticationError } from 'apollo-server';
module.exports = {
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
        putDetails: async(parent, {
            Details,
        }, {
            models: {
                detailsModel
            },
        }, info) => {
            const WriteResult = await detailsModel.update({
                    language: language
                },
                Details, {
                    upsert: true // if no details found, create a new entry
                }
            );
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Details : false;
        },
    },
};