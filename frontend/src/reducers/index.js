import { combineReducers } from "redux";
import dataDidLoad from "./dataDidLoad_reducer";

const rootReducer = combineReducers({
  data: dataDidLoad
});

export default rootReducer;