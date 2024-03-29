import { ReferenceDef, ReferencesFetched } from '@app/types/References'
import { OthersType } from '@app/types/Others'
import { createAction, props } from '@ngrx/store'
import { ResumeDef, ResumeFetched, QuoteFetched, QuoteDef } from '@app/types'

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
        case OthersType.quote:
            return createAction(
                '[Others Component] FetchQuote',
                props<{
                    language: string
                }>()
            )
    }
}


// REFERENCES ACTIONS
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

// RESUME ACTIONS
export const RESUME_FETCHED = createAction(
    '[Others Effect] Resume fetched',
    props<ResumeFetched>()
)

export const SAVE_RESUME = createAction(
    '[Others Component] Save Resume',
    props<{
        resume: ResumeDef
    }>()
)

export const REMOVE_RESUME = createAction(
    '[Others Component] RemoveResume',
    props<{
        language: string
    }>()
)

// QUOTE ACTIONS
export const QUOTE_FETCHED = createAction(
    '[Others Effect] Quote fetched',
    props<QuoteFetched>()
)

export const SAVE_QUOTE = createAction(
    '[Others Effect] Save Quote',
    props<{
        quote: QuoteDef
    }>()
)

export const REMOVE_QUOTE = createAction(
    '[Others Effect] Remove Quote',
    props<{
        id: string
    }>()
)