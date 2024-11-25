// src/components/App.js

import React, { useState } from 'react';
import SummarizeForm from './SummarizeForm';
import Menu from './Menu';
import '../styles/App.css';

const App = () => {
  const [summary, setSummary] = useState('');

  return (
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
  );
};

export default App;
