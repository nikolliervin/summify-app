import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners'; 
import { ToastContainer, toast, Slide } from 'react-toastify';
import SummifyApi from '../api/SummifyApi'; 
import 'react-toastify/dist/ReactToastify.css';

const SummarizeForm = ({ onSummary }) => {
  const [formatOptions, setFormatOptions] = useState([]);
  const [inputType, setInputType] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [numberOfSentences, setNumberOfSentences] = useState(1); 
  const [pdfBase64, setPdfBase64] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [summaryText, setSummaryText] = useState('');

  useEffect(() => {
    const fetchFormatOptions = async () => {
      try {
        const options = await SummifyApi.getFormatOptions();
        const formattedOptions = Object.entries(options).map(([type, label]) => ({
          value: type,
          label,
        }));
        
        setFormatOptions(formattedOptions);
        if (formattedOptions.length > 0) {
          setInputType(formattedOptions[0]);
        }
      } catch (error) {
        console.error('Failed to fetch format options:', error);
      }
    };

    fetchFormatOptions();
  }, []);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPdfBase64(reader.result.split(',')[1]); 
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const content = inputType.value === 'pdf' ? pdfBase64 : inputValue;
      const summaryResponse = await SummifyApi.summarize(content, inputType.value, numberOfSentences);
      setSummaryText(summaryResponse);
      onSummary(summaryResponse);
      setInputValue('');
      setNumberOfSentences(1);
      setPdfBase64(''); 
    } catch (error) {
      console.error('Error summarizing content:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(summaryText)
      .then(() => {
        toast.success('Summary copied to clipboard!', {
          position: "bottom-center",
          transition: Slide,
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error('Failed to copy text.', {
          position: "bottom-center",
          transition: Slide,
        });
      });
  };

  if (!inputType) {
    return <p>Loading...</p>;
  }

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
        <label htmlFor="inputValue" className='textbox-labels'>
          {inputType.value === 'pdf' ? 'Upload PDF:' : 'Insert URL:'}
        </label>
        
        {inputType.value === 'pdf' ? (
          <>
            <input
              id="inputValue"
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e.target.files[0])}
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

      <div className="input-container">
        <label htmlFor="numberOfSentences" className='textbox-labels'>Number of Sentences:</label>
        <input
          id="numberOfSentences"
          type="number"
          value={numberOfSentences}
          onChange={(e) => setNumberOfSentences(Math.max(1, e.target.value))}
          min="1"
          required
        />
      </div>

      <button type="submit" disabled={loading}>Summarize</button>

      {loading && (
        <div className="loader">
          <ClipLoader color="#007bff" loading={loading} size={50} />
          <p>Generating summary...</p>
        </div>
      )}

      {summaryText && (
        <div className="summary-container">
          <h3>Summarized Text:</h3>
          <p>{summaryText}</p>
          <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
        </div>
      )}

      <ToastContainer />
    </form>
  );
};

export default SummarizeForm;
