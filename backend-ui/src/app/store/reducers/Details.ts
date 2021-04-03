import { createReducer, on } from '@ngrx/store';
import * as DETAIL_ACTIONS from '@store_actions/Details';

export const initialState = {};

const detailsReducer = createReducer(
  initialState,
  on(DETAIL_ACTIONS.DETAILS_FETCHED, (state, action) => {
    // do some more logic here if needed
    return { ...state, data: { ...action.details } }}
  ),
)

export function reducer(state: object, action) {
  return detailsReducer(state, action)
}