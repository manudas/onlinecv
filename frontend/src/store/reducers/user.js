import {
    fullResumeDetailsLoad,
    briefUserDetailsIntroduction,
} from '../actions'

const userDataReducer = (state = {}, action) => {
    const { payload, type } = action
    switch (type) {
        case fullResumeDetailsLoad:
            return {...state, ...payload}
        case briefUserDetailsIntroduction:
            return {...state, ...payload}
		default:
    }
    return state
}

export default userDataReducer