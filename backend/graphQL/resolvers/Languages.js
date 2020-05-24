// import { AuthenticationError } from 'apollo-server';
module.exports = {
    Query: {
        languages: async(parent, {
            language
        }, {
            models: {
                languagesModel // configModel
            },
        }, info) => {
            const languageList = await languagesModel.findById({
                language
            }).sort({
                order: 1
            }).exec();
            return languageList;
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
        putLanguage: async(parent, {
            Language,
        }, {
            models: {
                languagesModel
            },
        }, info) => {
            const WriteResult = await languagesModel.update({
                name: Language.name,
                language: Language.language,
            }, Language, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Language : false;
        },
        removeLanguage: async(parent, {
            id,
        }, {
            models: {
                languagesModel
            },
        }, info) => {
            const WriteResult = await languagesModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};