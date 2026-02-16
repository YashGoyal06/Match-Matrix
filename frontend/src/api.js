import axios from 'axios';

// Ensure this matches your Django port (default 8000)
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const participantAPI = {
  // 1. Verify User (Whitelist Check)
  verify: async (identityData) => {
    try {
      const response = await axios.post(`${API_URL}/verify-user/`, identityData);
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server connection failed" };
    }
  },

  // 2. Register (Save to Supabase)
  register: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register/`, data);
      return response; 
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  // 3. Get Match Status (Polling)
  getMyMatch: async (email) => {
    try {
      // Sending email as a query parameter
      const response = await axios.get(`${API_URL}/get-my-match/`, {
        params: { email }
      });
      return response; 
    } catch (error) {
      console.error("Fetch match failed:", error);
      throw error;
    }
  }
};

export const adminAPI = {
  // Trigger the matching algorithm
  generateMatches: async () => {
    try {
      const response = await axios.post(`${API_URL}/trigger-matching/`);
      return response;
    } catch (error) {
      console.error("Matching failed:", error);
      throw error;
    }
  }
};

export default { participantAPI, adminAPI };