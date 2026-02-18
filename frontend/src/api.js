import axios from 'axios';

// Ensure this matches your Django port (default 8000)
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const participantAPI = {
  // 1. Verify User (Whitelist Check)
  verify: async (identityData) => {
    try {
      // Updated endpoint to match urls.py: 'verify/'
      const response = await axios.post(`${API_URL}/verify/`, identityData);
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : { message: "Server connection failed" };
    }
  },

  // 2. Register Individual
  register: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register/`, data);
      return response; 
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  // 3. Register Duo (New Feature)
  registerDuo: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register-duo/`, data);
      return response;
    } catch (error) {
      console.error("Duo Registration failed:", error);
      throw error;
    }
  },

  // 4. Get Match Status
  getMyMatch: async (email) => {
    try {
      // Updated endpoint to match urls.py: 'my-match/'
      const response = await axios.get(`${API_URL}/my-match/`, {
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
  // Get all registered users for the admin table
  getAllParticipants: async () => {
    try {
      const response = await axios.get(`${API_URL}/participants/`);
      return response;
    } catch (error) {
      console.error("Fetch participants failed:", error);
      throw error;
    }
  },

  // Get all active matches for the admin table
  getAllMatches: async () => {
    try {
      const response = await axios.get(`${API_URL}/matches/`);
      return response;
    } catch (error) {
      console.error("Fetch matches failed:", error);
      throw error;
    }
  },

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
