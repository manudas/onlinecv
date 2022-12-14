import { createAction, props } from "@ngrx/store"

export const SUCCESS = createAction(
    '[Common Action] Action was successful',
    props<{
        message: string
        timeout?: number
    }>()
)
export const WARNING = createAction(
    '[Common Action] Warning',
    props<{
        message: string
        timeout?: number
    }>()
)
export const FAIL = createAction(
    '[Common Action] Action failed',
    props<{
        message: string | string[]
        timeout?: number
    }>()
)

export const CLEANUP = createAction(
    '[Common Action] Clean message'
)