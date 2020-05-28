import { createAction } from '@ngrx/store'

export const FETCH_DETAILS = createAction('[Details Component] FetchDetails')
export const SAVE_DETAILS = createAction('[Details Component] SaveDetails')
export const RESET_DETAILS = createAction('[Details Component] ResetDetails')

export const DETAILS_FETCHED = createAction('[Details Effect] Details fetched')
export const DETAILS_FETCH_FAILED = createAction('[Details Effect] Details fetch failed')