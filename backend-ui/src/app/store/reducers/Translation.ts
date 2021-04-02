import { createReducer, on } from '@ngrx/store';
import * as TRANSLATE_ACTIONS from '@store_actions/Translation';

export const initialState = {};

const translationReducer = createReducer(
  initialState,
  on(TRANSLATE_ACTIONS.FETCH_TRANSLATIONS_OK, (state, { payload }) => {
    // do some more logic here if needed
    return { ...state, ...payload }} // payload contains a translations property with all the translations required
  ),
)

export function reducer(state: object, action) {
  return translationReducer(state, action)
}