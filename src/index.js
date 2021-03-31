import axios from "axios"
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.scss';
import breweries from "./api/breweries"
import breweriesCache from "./cache/breweries-cache"
import store from "./store/store"
import { Provider } from "react-redux"
import AppRouting from './config/routes';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouting breweries={breweries(axios,"https://api.openbrewerydb.org")} breweriesCache={breweriesCache()}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


