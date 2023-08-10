import { createAction, props } from '@ngrx/store'

import {
    PortfolioDef,
    PortfolioRequest,
} from '@app/types/Portfolio'

export const PORTFOLIO_FETCHED = createAction(
    '[Portfolio Effect] Portfolio fetched',
    props<{
        payload: PortfolioDef[]
    }>()
)

export const FETCH_PORTFOLIO = createAction(
    '[Portfolio Component] Fetch Portfolio',
    props<{
        language: string
    }>()
)

export const SAVE_PORTFOLIO = createAction(
    '[Portfolio Component] Set Portfolio',
    props<{
        portfolio: PortfolioDef[]
    }>()
)

export const REMOVE_PORTFOLIO = createAction(
    '[Portfolio Component] Remove Portfolio',
    props<{
        id: string
    }>()
)