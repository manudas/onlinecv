import { setLanguageAction } from '../actions'
import Cookies from 'universal-cookie';

import {
    DEFAULT_LANGUAGE_ISO,
    LANG_COOKIE,
} from 'helpers/constants';

const cookies = new Cookies();
const DEFAULT_LANGUAGE_STATE = cookies.get(LANG_COOKIE) ?? DEFAULT_LANGUAGE_ISO;

const languageReducer = function (state = DEFAULT_LANGUAGE_STATE, action) {
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

export default languageReducer