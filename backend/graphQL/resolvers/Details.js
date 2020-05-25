// import { AuthenticationError } from 'apollo-server';
module.exports = {
    Query: {
        details: async({ // 1st arg: arguments
            language
        }, { // 2nd arg: context
            models: {
                DetailsModel,
            }
        }) => {
            const details = await DetailsModel.findOne({
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
                DetailsModel
            },
        }) => {
            const WriteResult = await DetailsModel.update({
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