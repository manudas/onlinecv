module.exports = {
    Query: {
        getLocales: async(
            parentNotUsed,
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
        putLocale: async(parent, {
            Locale,
        }, {
            models: {
                Locale: LocaleModel
            },
        }, info) => {
            // we should be using insert here, as we're looking for the same document than inserting
            const WriteResult = await LocaleModel.update({
                name: Locale.nametag,
                iso: Locale.iso,
            }, Locale, {
                upsert: true // if no details found, create a new entry
            });
            return (WriteResult.nUpserted === 1 || WriteResult.nModified ===
                1) ? Locale : false;
        },
        removeLocale: async(parent, {
            id,
        }, {
            models: {
                Locale: LocaleModel
            },
        }, info) => {
            const WriteResult = await LocaleModel.remove({
                id
            }, true); // true == remove one
            return WriteResult.nRemoved === 1;
        },
    },
};
