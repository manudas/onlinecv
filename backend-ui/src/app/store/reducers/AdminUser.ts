import { createReducer, on } from '@ngrx/store';
import * as AUTH_ACTIONS from '@store_actions/Authentication'

export const initialState = null;

export const reducer = createReducer(
  initialState,
  on(AUTH_ACTIONS.getAdminUserFetched, (_state, { adminUser }) => {
    // do some more logic here if needed
    return adminUser
  }),
)