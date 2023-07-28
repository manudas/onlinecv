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

export const briefUserDetailsIntroduction = 'briefUserDetailsIntroduction';
export function requestUserDataLoad(lang) {
    // action creator
    return async function (dispatch) {
        const {
            query: queryUserData,
            variables: variablesUserData
        } = getUserIntroductionQuery(lang);
        const dataService = DataService.factory();
        const { data: { details, locales } } = await dataService.readData(
            queryUserData,
            variablesUserData
        );

        dispatch(localeLoadAction(locales))

        dispatch({
            type: briefUserDetailsIntroduction,
            payload: { introduction: details }
        });

        const {
            query: queryUserDetails,
            variables: variablesUserDetails
        } = getUserFullResumeQuery(lang);
        const { data: {unprotectedSettings, ...fullDetails} } = await dataService.readData(
            queryUserDetails,
            variablesUserDetails
        );

        dispatch(settingsLoadAction( unprotectedSettings ));
        dispatch(fullResumeDetailsLoadAction({ resume: fullDetails }));
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

export const fullResumeDetailsLoad = 'fullResumeDetailsLoad';
export function fullResumeDetailsLoadAction(data) {
    return {
        type: fullResumeDetailsLoad,
        payload: data
    };
}

export const settingsLoad = 'settingsLoad';
export function settingsLoadAction(data) {
    return {
        type: settingsLoad,
        payload: data
    };
}

export const localeLoad = 'localeLoad';
export function localeLoadAction(data) {
    return {
        type: localeLoad,
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
