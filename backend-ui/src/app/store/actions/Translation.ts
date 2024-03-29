import {
    EditTranslationStructure,
    PutTranslation,
    ReceivedTranslationsType,
    RemovedTranslation,
    TranslatedTranslations,
} from '@app/types/Translations';
import {
    createAction,
    props
} from '@ngrx/store'

export const FETCH_TRANSLATIONS = createAction(
    '[App Componet] Fetch Translations',
    props<{
        iso: string
        modules: string[]
        tags: string[]
        domain: string,
    }>()
);

export const FETCH_TRANSLATIONS_OK = createAction(
    '[App Componet] Fetch Translation OK',
    props<{
        payload: ReceivedTranslationsType
    }>()
);

export const FETCH_MISSING_TRANSLATIONS = createAction(
    '[Translation Componet] Fetch missing Translations',
    props<{
        iso: string
    }>()
);

export const FETCH_MISSING_TRANSLATIONS_OK = createAction(
    '[Translations Componet] Fetch missing Translation OK',
    props<{
        payload: ReceivedTranslationsType
    }>()
);

export const FETCH_TRANSLATED_TRANSLATIONS = createAction(
    '[Translation Componet] Fetch translated Translations',
    props<{
        iso: string
    }>()
);

export const FETCH_TRANSLATED_TRANSLATIONS_OK = createAction(
    '[Translations Componet] Fetch translated Translations OK',
    props<{
        payload: TranslatedTranslations
    }>()
);

export const SAVE_TRANSLATION =  createAction(
    '[Translation Component] SaveTranslation',
    props<{
        translation: EditTranslationStructure
    }>()
)

export const TRANSLATION_SAVED =  createAction(
    '[Translation Component/Effect] SavedTranslation',
    props<{
        payload: PutTranslation
    }>()
)

export const DELETE_TRANSLATION =  createAction(
    '[Translation Component] DeleteTranslation',
    props<{
        translation: string
    }>()
)

export const TRANSLATION_DELETED =  createAction(
    '[Translation Component/Effect] DeletedTranslation',
    props<{
        payload: RemovedTranslation
    }>()
)