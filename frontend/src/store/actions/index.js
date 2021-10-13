import Cookies from 'universal-cookie';

import {
    LANG_COOKIE
} from '../../helpers/constants'

import {
    getUserData as getUserDataService,
    getUserDetails
} from '../../services/getResume'

export const getUserDataAction = 'getUserData';
export function requestUserDataLoad(lang) { // action creator
    return async function(dispatch) {
        const { details } = await getUserDataService(lang);
        dispatch({
            type: getUserDataAction,
            payload: details
        });

        const fullDetails = await getUserDetails(lang);
        dispatch({
            type: userDetailsLoad,
            payload: fullDetails
        });
    }
}

export const userDetailsLoad = 'userDetailsLoad';
export function userDetailsLoadAction(data) {
    return {
        type: userDetailsLoad,
        payload: data
    }
}

export const setLanguageAction = 'setLanguage';
export function setLanguageAC(data) { // setLanguageActionCreator
    const cookie = new Cookies();
    cookie.set(LANG_COOKIE, data);
    return  {
        type: setLanguageAction,
        payload: data
    }
}

export const cvComponentsWereLoaded = 'cvComponentsWereLoaded';
export function cvComponentsWereLoadedActionCreator(data) {
	return  {
        type: cvComponentsWereLoaded,
        payload: data
    }
}

export const cvComponentsWereClicked = 'cvComponentsWereClicked';
export function cvComponentsWereClickedActionCreator(data) {
	const id = Date.now();
	return  {
        type: cvComponentsWereClicked,
        payload: {component: data, unique_id: id}
    }
}