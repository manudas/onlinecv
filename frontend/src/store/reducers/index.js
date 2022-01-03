import { combineReducers } from "redux";
import dataLoad from "./dataLoad_reducer";
import setLanguage from './setLanguage_reducer';
import componentListReducer from './cvComponentWereLoaded_reducer';
import componentClickReducer from './cvComponentWereClicked_reducer';

import translations from "./translation_reducer";

const rootReducer = combineReducers({
  data: dataLoad,
  language: setLanguage,
  component_list: componentListReducer,
  component_clicked_data: componentClickReducer,
  translations
});

export default rootReducer;