import { createReducer, on } from '@ngrx/store';
import * as AUTH_ACTIONS from '@store_actions/Authentication'

export const initialState = {};

export const reducer = createReducer(
  initialState,
  on(AUTH_ACTIONS.checkTokenSuccess, (state, _action) => {
    // do some more logic here if needed
    return {...state, authenticated: true}
  }),
  on(AUTH_ACTIONS.checkTokenFailure, (state, _action) => {
    // do some more logic here if needed
    return {...state, authenticated: false}
  }),
  on(AUTH_ACTIONS.checkAdminUserExistsFetched, (state, {
    checkAdminUserExists
  }) => {
    // do some more logic here if needed
    return {...state, adminUserExists: checkAdminUserExists}
  }),
  on(AUTH_ACTIONS.loginSuccess, (state, _action) => {
    // do some more logic here if needed
    return {...state, authenticated: true}
  }),
  on(AUTH_ACTIONS.loginFailure, (state, _action) => {
    // do some more logic here if needed
    return {...state, authenticated: false}
  }),
)