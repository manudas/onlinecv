import { createReducer, on } from '@ngrx/store';
import * as SOCIAL_NETWORKS_ACTIONS from '@store_actions/SocialNetworks';

export const initialState = {};

const socialNetworksReducer = createReducer(
  initialState,
  on(SOCIAL_NETWORKS_ACTIONS.NETWORKS_FETCHED, (state, action) => {
    // do some more logic here if needed
    return { ...state, list: [ ...action.socialNetworks ] }}
  ),
)

export function reducer(state: object, action) {
  return socialNetworksReducer(state, action)
}