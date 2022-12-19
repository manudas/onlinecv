import { createReducer, on } from '@ngrx/store';
import * as ACTION_SETTINGS from '@store_actions/Settings';

export const initialState = {};

export function reducer(state: object, action) {
  return createReducer(
    initialState,
    on(ACTION_SETTINGS.SETTINGS_FETCHED, (state, action) => {
      // do some more logic here if needed
      return { ...state, data: { ...action.settings } }}
    ),
  )(state, action)
}