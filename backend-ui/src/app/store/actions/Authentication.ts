import { Authentication } from '@app/types/Authentication';
import { createAction, props } from '@ngrx/store'

export const login = createAction(
  '[Login Page] Login',
  props<{ username: string; password: string, rememberMe: boolean }>()
)

export const singUp = createAction(
  '[Login Page] Sign Up',
  props<{ username: string; password: string, rememberMe: boolean }>()
)

export const loginSuccess = createAction(
  '[Login Effect] Login Success',
  props<{ Authentication: Authentication }>()
)

export const loginFailure = createAction(
  '[Login Effect] Login Failure',
  props<{ Authentication?: Authentication }>()
)

export const logOut = createAction(
  '[Login Effect] Login Out',
)

export const checkToken = createAction(
  '[Auth] Check Token',
)

export const checkTokenSuccess = createAction(
  '[Auth Effect] Check Token Success',
  props<{ Authentication: Authentication }>()
)

export const checkTokenFailure = createAction(
  '[Auth Effect] Check Token Failure',
  props<{ Authentication?: Authentication }>()
)

export const checkAdminUserExists = createAction(
  '[Auth] Check Admin User exists',
)

export const checkAdminUserExistsFetched = createAction(
  '[Auth] Check Admin User Fetched',
  props<{ checkAdminUserExists: boolean }>()
)

export const getAdminUser = createAction(
  '[Auth] Get Admin User',
)

export const getAdminUserFetched = createAction(
  '[Auth] Check Admin User Fetched',
  props<{ adminUser: string }>()
)
