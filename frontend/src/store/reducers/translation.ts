import { getTranslationsDataAction } from '../actions'

const translations = function (state: Record<string, any> = {}, action: { payload: any; type: any; }) {
    const {
        payload,
        type
    } = action
    switch (type) {
        case getTranslationsDataAction:
            if (payload?.length === 0) {
                // no new translations provided by server
                break
            }
            const result = {...state};
            payload.forEach((translation: {
                language: string,
                module: string,
                tag: string,
            }) => {
                const {
                    language,
                    module,
                    tag,
                } = translation;
                if (!result[language]) result[language] = {}
                if (!result[language][module]) result[language][module] = {}
                if (!result[language][module][tag]) result[language][module][tag] = translation
            })
            return result
        default:
    }

    return state
}

export default translations