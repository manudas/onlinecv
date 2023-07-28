import { AnyAction } from 'redux'
import {
    settingsLoad,
} from '../actions'

const settingsReducer = (state = {}, action: AnyAction) => {
    const { payload, type } = action
    switch (type) {
        case settingsLoad:
            return {...state, ...payload}
		default:
    }
    return state
}

export default settingsReducer