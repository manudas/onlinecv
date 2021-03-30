import { createAction, props } from '@ngrx/store'

export const FETCH_TRANSLATION = createAction(
    '[App Componet] Fetch Translation',
    props<{
        iso: string
        modules: string[]
        tags: string[]
    }>()
);