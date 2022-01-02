import store from '../store/storeProvider';

export const TRANSLATION_DOMAIN = 'FRONTEND-UI';
export const DEFAULT_LANGUAGE_ISO = 'en';

const requestedTranslations = {
    [TRANSLATION_DOMAIN]: {}
};

const requestTranslation = (tag, module) => {
    if (tag) {
        // let's avoid empty or undefined tags
        requestedTranslations[TRANSLATION_DOMAIN][module] =
            requestedTranslations[TRANSLATION_DOMAIN][
                module
            ] || [];
        if (
            !requestedTranslations[TRANSLATION_DOMAIN][
                module
            ].includes(tag)
        ) {
            requestedTranslations[TRANSLATION_DOMAIN][
                module
            ].push(tag);
        }
    }
};

const getTranslationsRequest = () => {
    return requestedTranslations[TRANSLATION_DOMAIN];
};

/**
 * Filters out all those already translated requests
 *
 * @param {string} selectedLocale: the actual selected language
 * @returns a list of requested translations that have not been
 * already returned as translated
 */

export const getNotTranslatedTranslationsRequest = (
    selectedLocale
) => {
    const translations = getTranslationsRequest();
    const filteredTranslations = {};
    Object.entries(translations).forEach(
        ([module, tags]) => {
            const filteredTags = tags.filter(
                (individualTag) => {
                    const existingTranslation =
                        getTranslation(
                            individualTag,
                            module,
                            selectedLocale
                        );
                    if (existingTranslation.translation) {
                        return false;
                    }
                    return true;
                }
            );
            if (filteredTags.length) {
                filteredTranslations[module] = filteredTags;
            }
        }
    );

    return filteredTranslations;
};

export const getModuleTagPairs = (
    translations
) => {
    const result = {
        module_arr: [],
        tag_arr: []
    };

    const indexValueList = Object.entries(translations);
    indexValueList.forEach(([key, value]) => {
        const keyArr = Array(value.length).fill(key); // fills the array with the key values.length times
        result.module_arr.push(...keyArr); // key is the name of the module for which we are looking the translation for
        result.tag_arr.push(...value); // value represents the tag we are looking the translation for inside its module
    });

    return result;
};

const getTranslation = (
    individualTag,
    module,
    selectedLocale
) => {
    return {

    }
}


export const translateString = (tag, module) => {
    store.subscribe(() => {
        console.log(store)
    })


    /*
    const { translations, language } = useSelector(
        // selector function
        ({
            translations = [],
            language = DEFAULT_LANGUAGE_ISO
        }) => {
            translations, language;
        }
    );
    */
/*
    const translation =
        translations?.[language]?.[module]?.[tag];

    if (translation) {
        return translation['text'];
    } else {
        requestTranslation(tag, module);
        return tag;
    }
    */
    const module_name = module.constructor.name;
    requestTranslation(tag, module_name);
};
