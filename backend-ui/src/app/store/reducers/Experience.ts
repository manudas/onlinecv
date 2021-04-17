import { createReducer, on } from '@ngrx/store';
import * as EXPERIENCE_ACTIONS from '@store_actions/Experience';

export const initialState = {};

const experienceReducer = createReducer(
  initialState,
  on(EXPERIENCE_ACTIONS.EXPERIENCE_FETCHED, (state, {
    experienceType,
    Experiences
  }) => {
    // do some more logic here if needed
    return { ...state, [experienceType]: [...Experiences]}}
  ),
)

export function reducer(state: object, action) {
  return experienceReducer(state, action)
}