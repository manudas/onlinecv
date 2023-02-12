const ObjectId = require('mongodb').ObjectId;
const cleanAndMapObject = require('@helpers/utils').cleanAndMapObject;

module.exports = {
    Query: {
        languages: async (
            _parent,
            { language },
            { models: { LanguagesModel } },
            _info
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
            _parent,
            { languages },
            { models: { LanguagesModel } },
            _info
        ) => {

            const WriteResult = await Promise.all(
                languages.map(async (language) => {
                    const cleanedLang = cleanAndMapObject(
                        language,
                        { id: '_id' }
                    );

                    if (!cleanedLang._id) {
                        cleanedLang._id = new ObjectId();
                    }

                    const element =
                        await LanguagesModel.findOneAndUpdate(
                            { _id: cleanedLang._id },
                            cleanedLang,
                            {
                                upsert: true, // if no details found, create a new entry
                                new: true // return the value of the object after the update and not before
                            }
                        );

                    return element;
                })
            );
            return WriteResult ? WriteResult : false;
        },
        removeLanguage: async (
            _parent,
            { id },
            { models: { LanguagesModel } },
            _info
        ) => {
            const WriteResult = await LanguagesModel.remove(
                {
                    _id: id
                },
                { justOne: true }
            );
            return WriteResult.deletedCount === 1;
        }
    }
};
