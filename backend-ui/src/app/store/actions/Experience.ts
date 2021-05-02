import { ExperienceFetched, ExperienceInterface } from '@app/types/Experience'
import { createAction, props } from '@ngrx/store'

export const SAVE_EXPERIENCES =  createAction(
    '[Experience Component] SaveExperiences',
    props<{
        experiences: ExperienceInterface[]
        experienceType: string
    }>()
)

export const FETCH_EXPERIENCE = createAction(
    '[Experience Component] FetchExperiences',
    props<{
        language: string
        experienceType: string
    }>()
)

export const EXPERIENCE_FETCHED = createAction(
    '[Experience Component] Experiences fetched',
    props<ExperienceFetched>()
)

export const REMOVE_EXPERIENCE = createAction(
    '[Experience Component] RemoveExperience',
    props<{
        id: string
        experienceType: string
    }>()
)