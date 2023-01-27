import Cookies from 'universal-cookie';

import { LANG_COOKIE } from 'helpers/constants';

import {
    getUserIntroductionQuery,
    getUserFullResumeQuery
} from 'queries/getResume';

import {
    getTranslationsQuery,
} from 'queries/getTranslations';

import { DataService } from 'queries/data.service';

export const getUserDataAction = 'getUserData';
export function requestUserDataLoad(lang) {
    // action creator
    return async function (dispatch) {
        const {
            query: queryUserData,
            variables: variablesUserData
        } = getUserIntroductionQuery(lang);
        const dataService = DataService.factory();
        const { data: { details } } = await dataService.readData(
            queryUserData,
            variablesUserData
        );

        dispatch({
            type: getUserDataAction,
            payload: { introduction: details }
        });

        const {
            query: queryUserDetails,
            variables: variablesUserDetails
        } = getUserFullResumeQuery(lang);
        const { data: fullDetails } = await dataService.readData(
            queryUserDetails,
            variablesUserDetails
        );

        dispatch(userDetailsLoadAction({ resume: fullDetails }));
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
        const { data: { translations } } = await dataService.readData(
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
export function setLanguage(data, setCookie = true) {
    // setLanguageActionCreator
    if (setCookie) {
        const cookie = new Cookies();
        cookie.set(LANG_COOKIE, data);
    }
    return {
        type: setLanguageAction,
        payload: data
    };
}
