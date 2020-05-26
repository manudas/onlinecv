module.exports = {
    Query: {
        // translation(tag: string!, module: string, language: String!)
        translation: async({
            tag,
            module,
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const translation = await TranslationsModel.findOne({
                tag,
                module,
                language
            }).exec();
            return translation;
        },
        translations: async({
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const translationList = await TranslationsModel.find({
                language
            }).sort({
                module: 1,
                tag: 1
            }).exec();
            return translationList;
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
        putTranslation: async(parent, {
            Translation,
        }, {
            models: {
                translationsModel
            },
        }, info) => {
            const WriteResult = await translationsModel.update({
                tag: Translation.tag,
                module: Translation.module,
                language: Translation.language
            }, Translation, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Translation : false;
        },
        removeTranslation: async(parent, {
            id,
        }, {
            models: {
                translationsModel
            },
        }, info) => {
            const WriteResult = await translationsModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};