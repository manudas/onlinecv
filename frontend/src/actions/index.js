export const dataLoaded = 'dataLoaded';
export function dataDidLoad(data) {
    return {
        type: dataLoaded,
        payload: data
    }
}

export const setLanguageAction = 'setLanguage'; 
export function setLanguageAC(data) { // setLanguageActionCreator
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