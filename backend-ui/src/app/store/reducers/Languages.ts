import { createReducer, on } from '@ngrx/store';
import * as LANGUAGES_ACTIONS from '@store_actions/Languages';

export const initialState = {};

const languagesReducer = createReducer(
  initialState,
  on(LANGUAGES_ACTIONS.LANGUAGES_FETCHED, (state, {
    languages
  }) => {
    // do some more logic here if needed
    return { ...state, list: [...languages]}}
  ),
)

export function reducer(state: object, action) {
  return languagesReducer(state, action)
}