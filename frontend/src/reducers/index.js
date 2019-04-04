import { combineReducers } from "redux";
import dataDidLoad from "./dataDidLoad_reducer";
import setLanguage from './setLanguage_reducer';
import componentListReducer from './cvComponentWereLoaded_reducer';
import componentClickReducer from './cvComponentWereClicked_reducer';

const rootReducer = combineReducers({
  data: dataDidLoad,
  language: setLanguage,
  component_list: componentListReducer,
  component_clicked_data: componentClickReducer
});

export default rootReducer;