import { createReducer, on } from '@ngrx/store';
import * as DETAIL_ACTIONS from '@store_actions/Details';

export const initialState = {};

const detailsReducer = (state, action) => createReducer(
  initialState,
  on(DETAIL_ACTIONS.DETAILS_FETCHED, state => {
    // do some more logic here if needed
    return { ...state, ...action.payload }}
  ),
)

export function reducer(state: object, action) {
  return detailsReducer(state, action)
}