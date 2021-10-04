import { SkillsFetched, SkillInterface } from '@app/types/Skills'
import { createAction, props } from '@ngrx/store'

export const SAVE_SKILLS =  createAction(
    '[Skill Component] SaveSkills',
    props<{
        skills: SkillInterface[]
        skillType: string
    }>()
)

export const FETCH_SKILLS = createAction(
    '[Skill Component] FetchSkills',
    props<{
        language: string
        skillType: string
    }>()
)

export const SKILLS_FETCHED = createAction(
    '[Skill Component] Skills fetched',
    props<SkillsFetched>()
)

export const REMOVE_SKILL = createAction(
    '[Skill Component] RemoveSkill',
    props<{
        id: string
        skillType: string
    }>()
)