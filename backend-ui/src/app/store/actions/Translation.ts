import { ReceivedTranslationsType } from '@app/types/Translations';
import { createAction, props } from '@ngrx/store'

export const FETCH_TRANSLATIONS = createAction(
    '[App Componet] Fetch Translation',
    props<{
        iso: string
        modules: string[]
        tags: string[]
    }>()
);

export const FETCH_TRANSLATIONS_OK = createAction(
    '[App Componet] Fetch Translation OK',
    props<{
        payload: ReceivedTranslationsType
    }>()
);
