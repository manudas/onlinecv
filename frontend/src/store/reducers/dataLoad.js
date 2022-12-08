import {
    userDetailsLoad,
    getUserDataAction,
} from '../actions'

const dataLoadReducer = (state = {}, action) => {
    const { payload, type } = action
    switch (type) {
        case userDetailsLoad:
            return {...state, ...payload}
        case getUserDataAction:
            return {...state, ...payload}
		default:
    }
    return state
}

export default dataLoadReducer