import {
    TranslationStore
} from '@app/types/Translations';
import {
    createReducer,
    on
} from '@ngrx/store';
import * as TRANSLATE_ACTIONS from '@store_actions/Translation';

export const initialState: TranslationStore = <TranslationStore>{};

const translationReducer = createReducer(
    initialState,
    on(TRANSLATE_ACTIONS.FETCH_TRANSLATIONS_OK, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const {
            translations: oldTranslations = [],
            translationManager,
            translationManager: {
                translated = []
            } = {}
        } = state
        const {
            translations: receivedTranslations
        } = payload

        const translationsObj = oldTranslations.reduce((acc, translation) => {
            acc[translation.id] = translation
            return acc
        }, {})

        const translatedObj = translated.reduce((acc, translation) => {
            acc[translation.id] = translation
            return acc
        }, {})

        receivedTranslations.forEach(translation => {
            translationsObj[translation.id] = translation
            translatedObj[translation.id] = translation
        })

        return {
            ...state,
            translations: Object.values(translationsObj),
            translationManager: {
              ...translationManager,
              translated: Object.values(translatedObj),
          }
        } // payload contains a translations property with all the translations required
    }),
    // missing translations
    on(TRANSLATE_ACTIONS.FETCH_MISSING_TRANSLATIONS_OK, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const {
            translationManager,
        } = state
        const {
            missing: oldMissing = []
        } = translationManager || {}
        const {
            missingTranslations: receivedTranslations
        } = payload

        // payload contains a receivedTranslations property with all the missing translations in a given language
        return {
            ...state,
            translationManager: {
                ...translationManager,
                missing: [...oldMissing, ...receivedTranslations]
            }
        }
    }),
    on(TRANSLATE_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS_OK, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const {
            translationManager,
        } = state
        const {
            translated: oldTranslated = []
        } = translationManager || {}
        const {
            translatedStrings: receivedTranslations
        } = payload

        // payload contains a receivedTranslations property with all the missing translations in a given language
        return {
            ...state,
            translationManager: {
                ...translationManager,
                translated: [...oldTranslated, ...receivedTranslations]
            }
        }
    }),
    // new stored translation
    on(TRANSLATE_ACTIONS.TRANSLATION_SAVED, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const {
            putTranslation: receivedTranslation,
            putTranslation: {
                id: translationId,
            },
        } = payload;
        const {
            translationManager,
            translations: oldTranslations = [],
        } = state
        const {
            missing: oldMissing = [],
            translated: oldTranslated = [],
        } = translationManager || {}

        let missing;
        const indexInMissing = oldMissing.findIndex((missingTranslation) => missingTranslation.id === translationId);
        if (indexInMissing !== -1) {
            missing = [
                ...oldMissing.slice(0, indexInMissing ),
                ...oldMissing.slice(indexInMissing + 1)
            ];
        } else {
            missing = [...oldMissing];
        }

        let translated;
        const indexInTranslated = oldTranslated.findIndex((translatedTranslation) => translatedTranslation.id === translationId);
        if (indexInTranslated !== -1) {
            translated = [
                ...oldTranslated.slice(0, indexInTranslated ),
                receivedTranslation,
                ...oldTranslated.slice(indexInTranslated + 1)
            ];
        } else {
            translated = [...oldTranslated, receivedTranslation];
        }

        let translations;
        const indexInTranslations = oldTranslations.findIndex((translatedTranslation) => translatedTranslation.id === translationId);
        if (indexInTranslations !== -1) {
            translations = [
                ...oldTranslations.slice(0, indexInTranslations ),
                receivedTranslation,
                ...oldTranslations.slice(indexInTranslations + 1)
            ];
        } else {
            translations = [...oldTranslations, receivedTranslation];
        }

        return {
            ...state,
            translations,
            translationManager: {
                ...translationManager,
                missing,
                translated
            }
        }
    }),
    on(TRANSLATE_ACTIONS.TRANSLATION_DELETED, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const {
            removeTranslation: {
                id: removedTranslationId,
            },
        } = payload;
        const {
            translations: oldTranslations = [],
            translationManager
        } = state
        const {
            missing: oldMissing = [],
            translated: oldTranslated = [],
        } = translationManager || {}

        let missing;
        const indexInMissing = oldMissing.findIndex((missingTranslation) => missingTranslation.id === removedTranslationId);
        if (indexInMissing !== -1) {
            missing = [
                ...oldMissing.slice(0, indexInMissing ),
                ...oldMissing.slice(indexInMissing + 1)
            ];
        } else {
            missing = [...oldMissing];
        }

        let translated;
        const indexInTranslated = oldTranslated.findIndex((translatedTranslation) => translatedTranslation.id === removedTranslationId);
        if (indexInTranslated !== -1) {
            translated = [
                ...oldTranslated.slice(0, indexInTranslated ),
                ...oldTranslated.slice(indexInTranslated + 1)
            ];
        } else {
            translated = [...oldTranslated];
        }

        let translations;
        const indexInTranslations = oldTranslations.findIndex((translatedTranslation) => translatedTranslation.id === removedTranslationId);
        if (indexInTranslations !== -1) {
            translations = [
                ...oldTranslations.slice(0, indexInTranslations ),
                ...oldTranslations.slice(indexInTranslations + 1)
            ];
        } else {
            translations = [...oldTranslations];
        }

        return {
            ...state,
            translations,
            translationManager: {
                ...translationManager,
                missing,
                translated
            }
        }
    }),
)

export function reducer(state: TranslationStore, action) {
    return translationReducer(state, action)
}