import { setLanguageAction } from '../actions'

const setLanguage = function (state = null, action) {
    const { payload, type } = action
    switch (type) {
        case setLanguageAction:
            if (!payload) {
                return state
            }
            const result = String(payload)
            return result;
        default:
    }

    return state
}

export default setLanguage