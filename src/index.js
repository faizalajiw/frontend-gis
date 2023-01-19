import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//react router dom
import { BrowserRouter } from 'react-router-dom';
//boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//mapbox gl css
import 'mapbox-gl/dist/mapbox-gl.css';
//mapbox gl geocoder css
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
//mapbox gl directions css
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
//import custom css
import './assets/css/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);