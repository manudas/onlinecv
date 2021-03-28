import { createReducer, on } from '@ngrx/store';
import * as LOCALE_ACTIONS from '@store_actions/Locale';

export const initialState = {};

const localeReducer = createReducer(
  initialState,
  on(LOCALE_ACTIONS.SET_LOCALE, (state, { iso }) => {
    // do some more logic here if needed
    return { ...state, selectedLocale: iso }}
  ),
  on(LOCALE_ACTIONS.AVAILABLE_LOCALES_FETCHED, (state, {payload}) => {
    const locales = {}
    Object.entries(payload).forEach(([_, value]) => {
      locales[value['iso']] = value
    })
    return { ...state, locales }
  }),
)

export function reducer(state: object, action) {
  return localeReducer(state, action)
}