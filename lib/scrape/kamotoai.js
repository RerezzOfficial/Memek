const axios = require('axios');

let kamotoai = {
  constructor: async function(apiKey, personalityId) {
    this.apiKey = apiKey;
    this.personalityId = personalityId;
    this.axiosInstance = axios.create({
      baseURL: 'https://api.kamoto.ai/v1',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'x-personality-id': this.personalityId,
      },
    });
  },
  chat: async function(message) {
    const payload = {
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    };
    try {
      const response = await this.axiosInstance.post('/chat-completions', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
      throw error;
    }
  },
   chatWithHistory: async function(messages) {
    const payload = { messages };
    try {
      const response = await this.axiosInstance.post('/chat-completions', payload);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
      throw error;
    }
  }
}

module.exports = { kamotoai }
