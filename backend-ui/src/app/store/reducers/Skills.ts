import { createReducer, on } from '@ngrx/store';
import * as SKILLS_ACTIONS from '@store_actions/Skills';

export const initialState = {};

const skillsReducer = createReducer(
  initialState,
  on(SKILLS_ACTIONS.SKILLS_FETCHED, (state, {
    skillType,
    Skills
  }) => {
    // do some more logic here if needed
    return { ...state, [skillType]: [...Skills]}}
  ),
)

export function reducer(state: object, action) {
  return skillsReducer(state, action)
}