module.exports = {
    Query: {
        getLocales: async(
            params,
            {
                models: {
                    LocaleModel,
                },
            },
            contextNotUsed,
            infoNotUsed
        ) => {
            const localesList =
                await LocaleModel.find().sort(
                    {
                        name: 1,
                    }
                ).exec();
            return localesList;
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
        putLocale: async({
            Locale,
        }, {
            models: {
                Locale: LocaleModel
            },
        }, info) => {
            const WriteResult = await LocaleModel.update({
                iso: Locale.iso,
            },  {default: false, ...Locale}, { // default is false by default
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Locale : false;
        },
        removeLocale: async({
            _id,
        }, {
            models: {
                Locale: LocaleModel
            },
        }, info) => {
            const WriteResult = await LocaleModel.remove({
                _id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};
