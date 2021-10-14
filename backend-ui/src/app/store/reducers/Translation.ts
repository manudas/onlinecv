import { TranslationStore } from '@app/types/Translations';
import { createReducer, on } from '@ngrx/store';
import * as TRANSLATE_ACTIONS from '@store_actions/Translation';

export const initialState = {};

const translationReducer = createReducer(
  initialState,
  on(TRANSLATE_ACTIONS.FETCH_TRANSLATIONS_OK, (state: TranslationStore, { payload }) => {
    // do some more logic here if needed
    const oldTranslations = state.translations || []
    const receivedTranslations = payload.translations

    return { ...state, translations: [...oldTranslations, ...receivedTranslations]} // payload contains a translations property with all the translations required
  }),
  // missing translations
  on(TRANSLATE_ACTIONS.FETCH_MISSING_TRANSLATIONS_OK, (state: TranslationStore, { payload }) => {
    // do some more logic here if needed
    const { translationManager } = state
    const { missing: oldMissing = [] } = translationManager || {}
    const { missingTranslations: receivedTranslations } = payload

    // payload contains a receivedTranslations property with all the missing translations in a given language
    return { ...state, translationManager: {...translationManager, missing: [...oldMissing, ...receivedTranslations]}}
  }),
)

export function reducer(state: object, action) {
  return translationReducer(state, action)
}
