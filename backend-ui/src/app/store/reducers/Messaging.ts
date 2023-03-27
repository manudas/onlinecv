import { createReducer, on } from '@ngrx/store'
import * as MESSAGING from '@store_actions/Messaging'

export const initialState = {};

export function reducer(state: object, action) {
  return createReducer(
    initialState,
    on(MESSAGING.MESSAGING_TYPES_FETCHED, (state, { messageTypes }) => {
      // do some more logic here if needed
      return { ...state, messageTypes }
    }),
  )(state, action)
}