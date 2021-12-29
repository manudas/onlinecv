import {
    TranslationStore
} from '@app/types/Translations';
import {
    createReducer,
    on
} from '@ngrx/store';
import * as TRANSLATE_ACTIONS from '@store_actions/Translation';

export const initialState = {};

const translationReducer = createReducer(
    initialState,
    on(TRANSLATE_ACTIONS.FETCH_TRANSLATIONS_OK, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const oldTranslations = state.translations || []
        const receivedTranslations = payload.translations

        return {
            ...state,
            translations: [...oldTranslations, ...receivedTranslations]
        } // payload contains a translations property with all the translations required
    }),
    // missing translations
    on(TRANSLATE_ACTIONS.FETCH_MISSING_TRANSLATIONS_OK, (state: TranslationStore, {
        payload
    }) => {
        // do some more logic here if needed
        const {
            translationManager
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
            translationManager
        } = state
        const {
            missing: oldMissing = [],
            translated: oldTranslated = [],
        } = translationManager || {}

        let missing;
        const indexInMissing = oldMissing.findIndex((missingTranslation) => missingTranslation.id === translationId);
        if (indexInMissing !== -1) {
            missing = [
                ...oldMissing.slice(0, Math.max(indexInMissing - 1, 0)),
                ...oldMissing.slice(indexInMissing + 1)
            ];
        } else {
            missing = [...oldMissing];
        }

        let translated;
        const indexInTranslated = oldTranslated.findIndex((translatedTranslation) => translatedTranslation.id === translationId);
        if (indexInTranslated !== -1) {
          translated = [
                ...oldTranslated.slice(0, Math.max(indexInTranslated - 1, 0)),
                receivedTranslation,
                ...oldTranslated.slice(indexInTranslated + 1)
            ];
        } else {
          translated = [...oldTranslated, receivedTranslation];
        }

        return {
            ...state,
            translationManager: {
                ...translationManager,
                missing,
                translated
            }
        }
    }),
)

export function reducer(state: object, action) {
    return translationReducer(state, action)
}