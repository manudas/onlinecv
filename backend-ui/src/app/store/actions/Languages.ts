import { LanguagesFetched, LanguageInterface } from '@app/types/Languages'
import { createAction, props } from '@ngrx/store'

export const SAVE_LANGUAGES =  createAction(
    '[Skill Component] SaveLanguages',
    props<{
        languages: LanguageInterface[]
    }>()
)

export const FETCH_LANGUAGES = createAction(
    '[Skill Component] FetchLanguages',
    props<{
        language: string
    }>()
)

export const LANGUAGES_FETCHED = createAction(
    '[Skill Component] Languages fetched',
    props<LanguagesFetched>()
)

export const REMOVE_LANGUAGE = createAction(
    '[Skill Component] RemoveLanguage',
    props<{
        id: string
    }>()
)