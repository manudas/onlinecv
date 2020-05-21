// import { AuthenticationError } from 'apollo-server';
export default {
    Query: {
        languages: async(parent, {
            language
        }, {
            models: {
                portfolioModel // configModel
            },
        }, info) => {
            const portfolioList = await portfolioModel.findById({
                language
            }).sort({
                order: 1
            }).exec();
            return portfolioList;
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
        putPortfolio: async(parent, {
            Portfolio,
        }, {
            models: {
                portfolioModel
            },
        }, info) => {
            const WriteResult = await portfolioModel.update({
                id: Portfolio.id,
            }, Portfolio, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Portfolio : false;
        },
        removePortfolio: async(parent, {
            id,
        }, {
            models: {
                portfolioModel
            },
        }, info) => {
            const WriteResult = await portfolioModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};