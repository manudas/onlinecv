import { AnyAction } from 'redux'
import { localeLoad } from '../actions'

const localeReducer = (state = [], action: AnyAction) => {
    const { payload, type } = action
    switch (type) {
        case localeLoad:
            return [...payload]
		default:
    }
    return state
}

export default localeReducer