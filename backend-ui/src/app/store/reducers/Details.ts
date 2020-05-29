import { createReducer, on } from '@ngrx/store';
import * as DETAIL_ACTIONS from '@store_actions/Details';
 
export const initialState = {};
 
export function detailsReducer(state: object, action) {
  // return _counterReducer(state, action);



  return createReducer(
    initialState,
    on(DETAIL_ACTIONS.DETAILS_FETCHED, state => ({ ...state, ...action.payload })),
  )(state, action)
}