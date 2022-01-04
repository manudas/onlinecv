module.exports = {
    Query: {
        locales: async (
            _params,
            { models: { LocaleModel } }
        ) => {
            const localesList = await LocaleModel.find()
                .sort({
                    name: 1
                })
                .exec();
            return localesList;
        }
    },
    Mutation: {
        putLocale: async (
            { Locale },
            { models: { Locale: LocaleModel } },
            info
        ) => {
            const WriteResult = await LocaleModel.update(
                {
                    iso: Locale.iso
                },
                { default: false, ...Locale },
                {
                    // default is false by default
                    upsert: true // if no details found, create a new entry
                }
            );
            return WriteResult.nUpserted === 1 ||
                WriteResult.nModified === 1
                ? Locale
                : false;
        },
        removeLocale: async (
            { _id },
            { models: { Locale: LocaleModel } },
            info
        ) => {
            const WriteResult = await LocaleModel.remove(
                {
                    _id
                },
                true
            ); // true == remove one
            return WriteResult.nRemoved === 1;
        }
    }
};
