import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);

// API endpoints
export const participantAPI = {
  register: (data) => api.post('/register/', data),
  getMyMatch: (email) => api.get(`/my-match/?email=${encodeURIComponent(email)}`),
};

export const adminAPI = {
  generateMatches: () => api.post('/admin/generate-matches/'),
  getAllParticipants: () => api.get('/admin/participants/'),
  getAllMatches: () => api.get('/admin/matches/'),
};

export default api;
