module.exports = {
    Query: {
        languages: async (
            { language },
            { models: { LanguagesModel } },
            info
        ) => {
            const lang =
                language === 'gb' ? 'en' : language;
            const languageList = await LanguagesModel.find({
                language: lang
            })
                .sort({
                    order: 1
                })
                .exec();
            return languageList;
        }
    },
    Mutation: {
        putLanguages: async (
            { Language },
            { models: { languagesModel } },
            info
        ) => {
            const WriteResult = await languagesModel.update(
                {
                    name: Language.name,
                    language: Language.language
                },
                Language,
                {
                    upsert: true // if no details found, create a new entry
                }
            );
            return WriteResult.nUpserted === 1 ||
                WriteResult.nModified === 1
                ? Language
                : false;
        },
        removeLanguage: async (
            parent,
            { id },
            { models: { languagesModel } },
            info
        ) => {
            const WriteResult = await languagesModel.remove(
                {
                    id
                },
                true
            ); // true == remove one
            return WriteResult.nRemoved === 1;
        }
    }
};
