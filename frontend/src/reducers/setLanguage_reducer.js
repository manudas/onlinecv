import { setLanguageAction } from '../actions';
// State argument is not application state, only the state
// this reducer is responsible for
export default function (state = null, action) {
    let payload = action.payload;
    switch (action.type) {
        case setLanguageAction:
            const result = payload;
            if (!payload) {
                result.language = (state && state.language ) 
                                            ? state.language : null;
            }
            return result;
    }
    return state;
}