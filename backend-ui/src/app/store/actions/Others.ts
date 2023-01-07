import { OthersType, ReferenceDef, ReferencesFetched } from '@app/types/References'
import { createAction, props } from '@ngrx/store'

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