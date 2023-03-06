import { combineReducers } from "redux"

import languageReducer from './language'
import localeReducer from "./locale"
import translations from "./translation"
import userDataReducer from "./user"

const rootReducer = combineReducers({
  data: userDataReducer,
  language: languageReducer,
  locales: localeReducer,
  translations
})

export default rootReducer