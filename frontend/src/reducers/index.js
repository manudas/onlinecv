import { combineReducers } from "redux";
import dataDidLoad from "./dataDidLoad_reducer";
import setLanguage from './setLanguage_reducer';
import componentListReducer from './cvComponentWereLoaded_reducer';

const rootReducer = combineReducers({
  data: dataDidLoad,
  language: setLanguage,
  component_list: componentListReducer
});

export default rootReducer;