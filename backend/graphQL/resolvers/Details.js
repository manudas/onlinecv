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
            }).lean().exec(); // lean to get the model as a plain javascript object
            details.profileImage = details.profileImage && details.profileImage.toString();
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
        putDetails: async({
            details,
        },
        {
            models: {
                DetailsModel
            },
        }, info
        ) => {
            const cleanedDetails = Object.entries(details).reduce((prev, [currKey, currVal], currIndex) => {
                if (currVal !== null) { // can be 0
                    prev[currKey !== 'id' ? currKey : '_id'] = currVal;
                }
                return prev;
            }, {});
            const DetailsWriteResult = await DetailsModel.findOneAndUpdate({
                    language: cleanedDetails.language
                },
                cleanedDetails, {
                    upsert: true, // if no details found, create a new entry
                    new: true // return the value of the object after the update and not before
                }
            );
            return DetailsWriteResult? DetailsWriteResult : false;
        },
    },
};