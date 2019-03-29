import { cvComponentsWereLoaded } from '../actions';
// State argument is not application state, only the state
// this reducer is responsible for
export default function (state = null, action) {
    let payload = action.payload;
    switch (action.type) {
        case cvComponentsWereLoaded:
            let result = payload;
            if (!payload) {
                result = (state && state.component_list ) 
                                            ? state.component_list : null;
            }
            return result;
    }
    return state;
}