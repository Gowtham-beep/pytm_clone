import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const accountService = {
  getBalance: () => api.get('/api/account/balance'),
  transfer: (recipientId: string, amount: number) => 
    api.post('/api/account/transfer', { recipientId, amount }),
};

export const userService = {
  updateProfile: (data: { firstName: string; lastName: string }) =>
    api.put('/api/user/updateinfo', data),
};