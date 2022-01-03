import Cookies from 'universal-cookie';

import { LANG_COOKIE } from '../../helpers/constants';

import {
    getUserDataQuery,
    getUserDetailsQuery
} from '../../queries/getResume';

import {
    getTranslationsQuery,
} from '../../queries/getTranslations';

import { DataService } from '../../queries/data.service';

export const getUserDataAction = 'getUserData';
export function requestUserDataLoad(lang) {
    // action creator
    return async function (dispatch) {
        const {
            query: queryUserData,
            variables: variablesUserData
        } = getUserDataQuery(lang);
        const dataService = DataService.factory();
        const { details } = await dataService.readData(
            queryUserData,
            variablesUserData
        );

        dispatch({
            type: getUserDataAction,
            payload: details
        });

        const {
            query: queryUserDetails,
            variables: variablesUserDetails
        } = getUserDetailsQuery(lang);
        const fullDetails = await dataService.readData(
            queryUserDetails,
            variablesUserDetails
        );

        dispatch({
            type: userDetailsLoad,
            payload: fullDetails
        });
    };
}

export const getTranslationsDataAction = 'getTranslations';
export function requestTranslations(lang, moduleTagsPairs) {
    // action creator
    return async function (dispatch) {

        const {
            tags,
            modules,
            domain
        } = moduleTagsPairs;

        const {
            query,
            variables
        } = getTranslationsQuery(lang, tags, modules, domain);
        const dataService = DataService.factory();
        const { translations } = await dataService.readData(
            query,
            variables
        );

        dispatch({
            type: getTranslationsDataAction,
            payload: translations
        });
    };
}

export const userDetailsLoad = 'userDetailsLoad';
export function userDetailsLoadAction(data) {
    return {
        type: userDetailsLoad,
        payload: data
    };
}

export const setLanguageAction = 'setLanguage';
export function setLanguageAC(data) {
    // setLanguageActionCreator
    const cookie = new Cookies();
    cookie.set(LANG_COOKIE, data);
    return {
        type: setLanguageAction,
        payload: data
    };
}

export const cvComponentsWereLoaded =
    'cvComponentsWereLoaded';
export function cvComponentsWereLoadedActionCreator(data) {
    return {
        type: cvComponentsWereLoaded,
        payload: data
    };
}

export const cvComponentsWereClicked =
    'cvComponentsWereClicked';
export function cvComponentsWereClickedActionCreator(data) {
    const id = Date.now();
    return {
        type: cvComponentsWereClicked,
        payload: { component: data, unique_id: id }
    };
}
