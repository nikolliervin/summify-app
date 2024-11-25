// src/components/App.js

import React, { useState } from 'react';
import SummarizeForm from './SummarizeForm';
import Menu from './Menu';
import '../styles/App.css';
import ErrorBoundary from '../utils/ErrorBoundry';


const App = () => {
  const [summary, setSummary] = useState('');

  return (
    <ErrorBoundary>
    <div className="app">
      <header className="header">
        <h1>Summify</h1>
      </header>
      {/* <Menu /> */}
      <SummarizeForm onSummary={setSummary} />
      <footer className="footer">
        <p>&copy; 2024 Summify</p>
      </footer>
    </div>
    </ErrorBoundary>);
};

export default App;
