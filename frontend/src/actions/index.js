 export const dataLoaded = 'dataLoaded';

export function dataDidLoad(data) {
    return {
        type: dataLoaded,
        payload: data
    }
}