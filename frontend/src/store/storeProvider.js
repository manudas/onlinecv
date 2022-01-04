import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const composedMiddleWareWithDevTools = composeWithDevTools(
    applyMiddleware(thunkMiddleware)
);

const store = createStore(
    reducers,
    composedMiddleWareWithDevTools
);

export default store;
