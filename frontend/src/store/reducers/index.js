import { combineReducers } from "redux"

import languageReducer from './language'
import localeReducer from "./locale"
import translations from "./translation"
import userDataReducer from "./user"
import settingsReducer from "./settings"

const rootReducer = combineReducers({
  data: userDataReducer,
  language: languageReducer,
  locales: localeReducer,
  settings: settingsReducer,
  translations
})

export default rootReducer