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

    return { ...state, translations: [...oldTranslations, ...receivedTranslations]}} // payload contains a translations property with all the translations required
  ),
)

export function reducer(state: object, action) {
  return translationReducer(state, action)
}