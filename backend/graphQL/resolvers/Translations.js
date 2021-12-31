const findAndUpdateMany = require('@helpers/utils').findAndUpdateMany;
const cleanObject = require('@helpers/utils').cleanObject;
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    Query: {
        translations: async ({
            modules,
            tags,
            domain,
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const lang = language === 'gb' ? 'en' : language;
            if (modules.length !== tags.length) {
                throw new Error('Both modules and tags arrays must be size coincident and map each index to a domain/module/tag triplet');
            }

            const translationFilter = modules.map((module, index) => ({
                module,
                tag: tags[index],
                missing: null,
                ...(domain ? {
                    domain: domain
                } : {})
            }));

            const missingTranslationFilter = modules.map((module, index) => ({
                module,
                tag: tags[index],
                missing: true,
                ...(domain ? {
                    domain: domain
                } : {})
            }));

            // FOUND TRANSLATIONS: fetching and updating accessCounter and lastTimeFetched
            const translationList = await findAndUpdateMany(TranslationsModel, {
                $and: [{
                        $or: translationFilter
                    },
                    {
                        language: lang
                    }
                ]
            }, {
                $inc: {
                    accessCounter: 1
                },
                $currentDate: {
                    lastTimeFetched: true // datetime
                }
            });
            // END OF FOUND TRANSLATIONS

            // UPDATING accessCounter and lastTimeFetched OF missing: true TRANSLATIONS
            const resultMissingTrue = await findAndUpdateMany(TranslationsModel, {
                $and: [{
                        $or: missingTranslationFilter
                    },
                    {
                        language: lang
                    }
                ]
            }, {
                $inc: {
                    accessCounter: 1
                },
                $currentDate: {
                    lastTimeFetched: true // datetime
                }
            });
            // END OF UPDATING accessCounter and lastTimeFetched OF missing: true TRANSLATIONS

            // UPSERTING COMPLETELY MISSING TRANSLATIONS
            const elementFoundInTranslationOrMissingTrue = (element) => (
                translationList.some((translatedElement) => { // is element in the translated list?
                    return translatedElement.domain === element.domain && translatedElement.module === element.module && translatedElement.tag === element.tag;
                }) ||
                resultMissingTrue.some((missingTruetranslatedElement) => { // is element in the missing: true translated list?
                    return missingTruetranslatedElement.domain === element.domain && missingTruetranslatedElement.module === element.module && missingTruetranslatedElement.tag === element.tag;
                })
            );

            const missingTranslations = translationFilter.length ?
                translationFilter.reduce((untranslatedList, currentTranslation) => {
                    const elementIndex = elementFoundInTranslationOrMissingTrue(currentTranslation) ?
                        untranslatedList.findIndex((elem) =>
                            elem.domain === currentTranslation.domain &&
                            elem.module === currentTranslation.module &&
                            elem.tag === currentTranslation.tag
                        ) :
                        -1;
                    if (elementIndex !== -1) {
                        untranslatedList.splice(elementIndex, 1);
                    }
                    return untranslatedList;
                }, [...translationFilter]) : [...translationFilter];

            const lastTimeFetched = new Date();
            const missingDocuments = missingTranslations.map((element) => ({
                ...element,
                missing: true,
                language: lang,
                accessCounter: 1,
                lastTimeFetched
            }));

            TranslationsModel.insertMany(missingDocuments);
            // END OF UPSERTING COMPLETELY MISSING TRANSLATIONS

            return translationList;
        },
        missingTranslations: async ({
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            return await TranslationsModel.find({
                language,
                missing: true
            });
        },
        translatedStrings: async ({
            language
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            return await TranslationsModel.find({
                language,
                missing: null
            });
        },
    },
    Mutation: {
        putTranslation: async ({
            translation,
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const cleanedObject = cleanObject(translation, {
                'id': '_id'
            });

            if (!cleanedObject._id) {
                cleanedObject._id = new ObjectId();
            }

            const element = await TranslationsModel.findOneAndUpdate({
                _id: cleanedObject._id
            }, {
                ...cleanedObject,
                $unset: {
                    missing: 1
                }
            }, {
                upsert: true, // if no details found, create a new entry
                new: true // return the value of the object after the update and not before
            });

            return element;
        },
        removeTranslation: async ({
            id,
        }, {
            models: {
                TranslationsModel
            },
        }, info) => {
            const removedElement = await TranslationsModel.findOneAndDelete({
                _id: id
            });
            if (removedElement) {
                return removedElement;
            }
            throw new Error(`Translations with id: ${id} does not exist`);
        },
    },
};