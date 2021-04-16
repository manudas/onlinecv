import { createReducer, on } from '@ngrx/store';
import * as TRAINING_ACTIONS from '@store_actions/Training';

export const initialState = {};

const trainingReducer = createReducer(
  initialState,
  on(TRAINING_ACTIONS.TRAINING_FETCHED, (state, {
    trainingType,
    Trainings
  }) => {
    // do some more logic here if needed
    return { ...state, [trainingType]: Trainings}}
  ),
)

export function reducer(state: object, action) {
  return trainingReducer(state, action)
}