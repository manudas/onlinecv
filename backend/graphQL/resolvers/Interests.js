// import { AuthenticationError } from 'apollo-server';
export default {
    Query: {
        interests: async(parent, {
            language
        }, {
            models: {
                interestsModel
            },
        }, info) => {
            const interestList = await interestsModel.findById({
                language: language
            }).sort({
                order: 1
            }).exec();
            return interestList;
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
        putInterest: async(parent, {
            Interest,
        }, {
            models: {
                interestsModel
            },
        }, info) => {
            const WriteResult = await interestsModel.update({
                    id: Interest.id
                },
                Interest, {
                    upsert: true // if no details found, create a new entry
                }
            );
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Interest : false;
        },
        removeInterest: async(parent, {
            id,
        }, {
            models: {
                interestsModel
            },
        }, info) => {
            const WriteResult = await interestsModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};