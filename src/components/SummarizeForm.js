// src/components/SummarizeForm.js

import React, { useState } from 'react';
import Select from 'react-select';

const formatOptions = [
  { value: 'youtube', label: 'YouTube Video' },
  { value: 'article', label: 'Article Link' },
  { value: 'pdf', label: 'PDF Upload' },
];

const SummarizeForm = ({ onSummary }) => {
  const [inputType, setInputType] = useState(formatOptions[0]); 
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const summaryText = `Summary for ${inputType.label}: ${inputValue}`;
    onSummary(summaryText);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="inputType">Select Format:</label>
        <div className="select-container">
          <Select
            id="inputType"
            options={formatOptions}
            value={inputType}
            onChange={setInputType}
            className="react-select"
          />
        </div>
      </div>

      <div className="input-container">
  <label htmlFor="inputValue">
    {inputType.value === 'pdf' ? 'Upload PDF:' : 'Insert URL:'}
  </label>
  
  {inputType.value === 'pdf' ? (
    <>
      <input
        id="inputValue"
        type="file"
        accept="application/pdf"
        onChange={(e) => setInputValue(e.target.files[0])}
        required
      />
      <label className="upload-label" htmlFor="inputValue">Choose File</label>
    </>
  ) : (
    <input
      id="inputValue"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={inputType.value === 'youtube' ? 'youtube.com/watch?v=...' : 'https://example.com'}
      required
    />
  )}
</div>


      <button type="submit">Summarize</button>
    </form>
  );
};

export default SummarizeForm;
