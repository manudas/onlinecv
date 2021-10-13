import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";

import reducers from "./store/reducers";

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const middleWare = applyMiddleware(thunkMiddleware);

ReactDOM.render(
    <Provider store={createStore(reducers, middleWare)}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
