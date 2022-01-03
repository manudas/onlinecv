import { setLanguageAction } from '../actions';

export default function (state = null, action) {
    const { payload, type } = action;
    switch (type) {
        case setLanguageAction:
            if (!payload) {
                return state;
            }
            const result = String(payload);
            return result;
        default:
    }

    return state;
}
