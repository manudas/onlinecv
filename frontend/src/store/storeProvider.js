import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducers from "./reducers";

const middleWare = applyMiddleware(thunkMiddleware);

const store = createStore(reducers, middleWare);

export default store;