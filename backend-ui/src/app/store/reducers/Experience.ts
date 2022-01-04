import { createReducer, on } from '@ngrx/store';
import * as EXPERIENCE_ACTIONS from '@store_actions/Experience';

export const initialState = {};

const experienceReducer = createReducer(
  initialState,
  on(EXPERIENCE_ACTIONS.EXPERIENCE_FETCHED, (state, {
    experienceType,
    experiences
  }) => {
    // do some more logic here if needed
    return { ...state, [experienceType]: [...experiences]}}
  ),
)

export function reducer(state: object, action) {
  return experienceReducer(state, action)
}