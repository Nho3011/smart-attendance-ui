import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://oupzf1w6yj.execute-api.ap-southeast-1.amazonaws.com/api/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request Interceptor: add token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized → redirect login');
        window.location.href = '/login';
      }
    }

    return Promise.reject(formatApiError(error));
  }
);

export function formatApiError(error) {
  return {
    status: error.response?.status,
    message: error.response?.data?.message || error.response?.data?.error || error.message || 'Unknown error',
    raw: error
  };
}

export default axiosClient;
