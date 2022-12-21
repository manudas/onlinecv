import { createAction, props } from '@ngrx/store'

import {
    LocaleType,
} from '@app/types/Locale'

export const AVAILABLE_LOCALES_FETCHED = createAction(
    '[Locale Effect] Available locales fetched',
    props<{
        payload: LocaleType[]
    }>()
)

export const FETCH_AVAILABLE_LOCALES = createAction('[Locale Effect] Fetch available locales')

export const SET_LOCALE = createAction(
    '[Locale Effect] Set Locale',
    props<{
        iso: string
    }>()
);