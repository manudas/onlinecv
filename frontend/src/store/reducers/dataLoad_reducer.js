import {
    userDetailsLoad,
    getUserDataAction,
} from '../actions';

// State argument is not application state, only the state
// this reducer is responsible for
export default function (state = null, action) {
    let payload = action.payload;
    switch (action.type) {
        case userDetailsLoad:
            return {...state, userDetails: payload};
            break;
        case getUserDataAction:
            return {...state, userData: payload};
		default:
    }
    return state;
}