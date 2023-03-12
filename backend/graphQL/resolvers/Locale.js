export default {
    Query: {
        locales: async (
            _parent,
            _params,
            { models: { LocaleModel } },
            _info
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
            _parent,
            { Locale },
            { models: { Locale: LocaleModel } },
            _info
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
            return WriteResult.modifiedCount === 1 ||
                WriteResult.upsertedCount === 1
                ? Locale
                : false;
        },
        removeLocale: async (
            _parent,
            { _id },
            { models: { Locale: LocaleModel } },
            _info
        ) => {
            const WriteResult = await LocaleModel.remove(
                {
                    _id
                },
                true
            ); // true == remove one
            return WriteResult.deletedCount === 1;
        }
    }
};
