module.exports = {
    Query: {
        // translation(tag: string!, module: string, language: String!)
        translation: async({
            tags,
            modules,
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const lang = language === 'gb' ? 'en' : language;
            const translation = await TranslationsModel.findOne({
                tags,
                modules,
                language: lang
            }).exec();
            return translation;
        },
        translations: async({
            modules,
            tags,
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const lang = language === 'gb' ? 'en' : language;
            if (modules.length !== tags.length) {
                throw new Error('Both modules and tags arrays must be size coincident and map each index to a module/tag pair');
            }

            const moduleTagPairs = modules.map((module, index) => (
                { module, tag: tags[index] }
            ));
            const translationList = await TranslationsModel.find({
                $and: [
                    { $or: moduleTagPairs },
                    { language: lang }
                ]
            }).sort({
                module: 1,
                tag: 1
            }).exec();
/* run through all translations to update this two properties:
    lastAccessed: Schema.Types.Date,
    accessCounter: Number

    ADD ANOTHER COLLECTION TO ADD THE NOT FOUND TRANSLATIONS
    IF SOMEONE WASNT FOUND AND NOW IS FOUND, THEN REMOVE FROM NOT FOUND TRANSLATIONS
*/
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