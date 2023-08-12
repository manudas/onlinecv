import { PortfolioDef } from '@app/types';
import { createReducer, on } from '@ngrx/store';
import * as PORTFOLIO_ACTIONS from '@store_actions/Portfolio';

export const initialState = [];

const portfolioReducer = createReducer(
  initialState,
  on(PORTFOLIO_ACTIONS.PORTFOLIO_FETCHED, (state, {
    payload
  }) => {
    // do some more logic here if needed
    return [...payload]
  }),
)

export function reducer(state: Array<PortfolioDef>, action) {
  return portfolioReducer(state, action)
}