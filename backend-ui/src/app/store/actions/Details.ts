import { DetailsType, FetchDetailsPropsType } from '@app/types/Details'
import { createAction, props } from '@ngrx/store'

export const FETCH_DETAILS = createAction(
    '[Details Component] FetchDetails',
    props<FetchDetailsPropsType>()
)
export const SAVE_DETAILS = createAction(
    '[Details Component] SaveDetails',
    props<{ details: DetailsType }>()
)
export const RESET_DETAILS = createAction('[Details Component] ResetDetails')

export const DETAILS_FETCHED = createAction('[Details Effect] Details fetched')
export const DETAILS_FETCH_FAILED = createAction('[Details Effect] Details fetch failed')