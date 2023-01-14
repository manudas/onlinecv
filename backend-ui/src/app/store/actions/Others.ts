import { ReferenceDef, ReferencesFetched } from '@app/types/References'
import { OthersType } from '@app/types/Others'
import { createAction, props } from '@ngrx/store'
import { ResumeFetched } from '@app/types'

export const SAVE_REFERENCES =  createAction(
    '[Others Component] SaveData',
    props<{
        references: ReferenceDef[]
    }>()
)

export const FETCH = (type: OthersType) => {
    switch (type) {
        case OthersType['professional-references']:
            return createAction(
                '[Others Component] FetchReferences',
                props<{
                    language: string
                }>()
            )
        case OthersType['upload-resume']:
            return createAction(
                '[Others Component] FetchResumeFile',
                props<{
                    language: string
                }>()
            )
    }
}

export const REFERENCES_FETCHED = createAction(
    '[Others Effect] References fetched',
    props<ReferencesFetched>()
)

export const REMOVE_REFERENCE = createAction(
    '[Others Component] RemoveReference',
    props<{
        id: string
    }>()
)

export const RESUME_FETCHED = createAction(
    '[Others Effect] Resume fetched',
    props<ResumeFetched>()
)