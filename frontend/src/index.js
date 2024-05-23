import "babel-polyfill";
import "react-app-polyfill/ie11";

import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import './assets/css/common.css';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById("root")
);


serviceWorker.unregister();
