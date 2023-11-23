import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import "antd/dist/antd.css";
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./_reducers/index";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render (
  <Provider store={createStoreWithMiddleware(Reducer)}>
    <App />
  </Provider>
);
