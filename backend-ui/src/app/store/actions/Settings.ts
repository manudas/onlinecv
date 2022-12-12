import { SettingsType, FetchSettingsPropsType } from '@app/types/Settings'
import { createAction, props } from '@ngrx/store'

export const FETCH_SETTINGS = createAction(
    '[Settings Component] FetchSettings',
    props<FetchSettingsPropsType>()
)
export const SAVE_SETTINGS = createAction(
    '[Settings Component] SaveSettings',
    props<{ settings: SettingsType }>()
)
