import { createReducer, on } from '@ngrx/store';
import * as ACTION_OTHERS from '@store_actions/Others';

export const initialState = {};

export function reducer(state: object, action) {
  return createReducer(
    initialState,
    on(ACTION_OTHERS.QUOTE_FETCHED, (state, { quote }) => {
      // do some more logic here if needed
      return { ...quote }
    }),
  )(state, action)
}