import { createReducer, on } from '@ngrx/store';
import * as REFERENCE_ACTIONS from '@store_actions/Others'

export const initialState = {};

export const reducer = createReducer(
  initialState,
  on(REFERENCE_ACTIONS.REFERENCES_FETCHED, (state, {
    references
  }) => {
    // do some more logic here if needed
    return [ ...references]
  }),
)