// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // Correct path to App.js
import './index.css'; // Assuming this is your global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
