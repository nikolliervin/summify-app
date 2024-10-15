import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');

  const handleInputChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = 'https://your-summarizing-api.com/summarize';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching the summary:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>YouTube Video Summarizer</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="video">Insert a YouTube video URL:</label>
        </div>
        <div>
          <input
            id="video"
            type="text"
            value={videoUrl}
            onChange={handleInputChange}
            placeholder="youtube.com/watch?v=j0u7ub3m473"
            required
          />
          <button type="submit">Summarize</button>
        </div>
      </form>
      {summary && (
        <div className="summary">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
      <footer className="footer">
        <p>&copy; 2024 Your App Name</p>
      </footer>
    </div>
  );
}

export default App;
