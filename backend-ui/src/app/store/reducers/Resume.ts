import { createReducer, on } from '@ngrx/store';
import * as ACTIONS from '@store_actions/Others'

export const initialState = {};

export const reducer = createReducer(
  initialState,
  on(ACTIONS.RESUME_FETCHED, (state, {
    resume
  }) => {
    // do some more logic here if needed
    return resume
  }),
)