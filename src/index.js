import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import { verifyAuth } from "./redux/actions/authActions";
import rootReducer from "./redux/reducers/rootReducer";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(thunk, save()))
);

// fetch products
store.dispatch(fetchProducts());

// verify authentication
store.dispatch(verifyAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
