import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_YT_URL;
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_YT_API;
axios.defaults.headers.common['Cache-Control'] = 'max-age=2592000';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axios.defaults.headers.common['X-RapidAPI-Key'] = process.env.REACT_APP_API_KEY;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
