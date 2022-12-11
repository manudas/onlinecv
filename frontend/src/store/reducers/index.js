import { combineReducers } from "redux"
import dataLoad from "./dataLoad"
import setLanguage from './setLanguage'

import translations from "./translation"

const rootReducer = combineReducers({
  data: dataLoad,
  language: setLanguage,
  translations
})

export default rootReducer