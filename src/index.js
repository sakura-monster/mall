import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './util/rem'
import {Provider} from 'react-redux'
import store from "./store/store";
import "./asset/icomoon/style.css"
React.Component.prototype.$url = 'http://192.168.191.1:3000';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

