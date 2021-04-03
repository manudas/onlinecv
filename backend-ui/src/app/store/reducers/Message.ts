import { createReducer, on } from '@ngrx/store';
import * as COMMON_ACTIONS from '@store_actions/Common';

export const initialState = {};

const messageStateReducer = (state, action) => {
    // do some more logic here if needed
    return { ...state, ...action }
}

const messageReducer = createReducer(
  initialState,
  on(COMMON_ACTIONS.SUCCESS, messageStateReducer),
  on(COMMON_ACTIONS.FAIL, messageStateReducer),
  on(COMMON_ACTIONS.WARNING, messageStateReducer),
  on(COMMON_ACTIONS.CLEANUP, () => {
      return { ...initialState }
  }),
)

export function reducer(state: object, action) {
  return messageReducer(state, action)
}