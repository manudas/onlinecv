import {
    userDetailsLoad,
    getUserDataAction,
} from '../actions';

export default function (state = {}, action) {
    const { payload, type } = action;
    switch (type) {
        case userDetailsLoad:
            return {...state, ...payload};
        case getUserDataAction:
            return {...state, ...payload};
		default:
    }
    return state;
}