// src/api/SummifyApi.js

import axios from 'axios';

class SummifyApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5023', // Set the base URL for your API
      timeout: 120000, // Optional: Set a timeout for requests
    });
  }

  async getFormatOptions() {
    try {
      const response = await this.api.get('/api/types'); // Fetch format types
      return response.data; // Adjust based on the actual response structure
    } catch (error) {
      console.error('Error fetching format options:', error);
      throw error; // Rethrow the error for further handling if necessary
    }
  }

  async getModels() {
    try {
      const response = await this.api.get('/api/types/models'); // Fetch format types
      return response.data; // Adjust based on the actual response structure
    } catch (error) {
      console.error('Error fetching format options:', error);
      throw error; // Rethrow the error for further handling if necessary
    }
  }


  async summarize(content, type, numberOfSentences, model) {
    try {
      const response = await this.api.post('/api/summarize', {
        content,
        type,
        numberOfSentences,
        model
      });
      return response.data; // Adjust based on the actual response structure
    } catch (error) {
      console.error('Error summarizing content:', error);
      throw error;
    }
  }
}

export default new SummifyApi(); // Export a single instance of the API class
