import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login/', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/registration/', {
      email,
      password1: password,
      password2: password,
      name,
    });
    return response.data;
  },
  logout: async () => {
    await api.post('/auth/logout/');
    localStorage.removeItem('token');
  },
};

export const collectibles = {
  getAll: async () => {
    const response = await api.get('/collectibles/');
    return response.data;
  },
  getByGroup: async (groupId: string) => {
    const response = await api.get(`/collectibles/?group=${groupId}`);
    return response.data;
  },
  create: async (data: FormData) => {
    const response = await api.post('/collectibles/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  update: async (id: string, data: FormData) => {
    const response = await api.put(`/collectibles/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/collectibles/${id}/`);
  },
};

export const groups = {
  getAll: async () => {
    const response = await api.get('/groups/');
    return response.data;
  },
  create: async (data: { name: string; description: string }) => {
    const response = await api.post('/groups/', data);
    return response.data;
  },
  update: async (id: string, data: { name: string; description: string }) => {
    const response = await api.put(`/groups/${id}/`, data);
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/groups/${id}/`);
  },
};

export default api;