import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Posts
export const postAPI = {
  createPost: (data: { content: string; image_url?: string }) => api.post('/posts', data),
  getFeed: (limit = 20, offset = 0) => api.get(`/posts/feed?limit=${limit}&offset=${offset}`),
  getPost: (id: number) => api.get(`/posts/${id}`),
  deletePost: (id: number) => api.delete(`/posts/${id}`),
  likePost: (id: number) => api.post(`/posts/${id}/like`),
};

// Comments
export const commentAPI = {
  createComment: (postId: number, data: { content: string }) =>
    api.post(`/posts/${postId}/comments`, data),
  getComments: (postId: number, limit = 20, offset = 0) =>
    api.get(`/posts/${postId}/comments?limit=${limit}&offset=${offset}`),
  deleteComment: (commentId: number) => api.delete(`/posts/comments/${commentId}`),
};

// Users
export const userAPI = {
  getProfile: (username: string) => api.get(`/users/${username}`),
  updateProfile: (data: any) => api.put('/users/profile', data),
  followUser: (userId: number) => api.post(`/users/${userId}/follow`),
  getUserPosts: (username: string, limit = 20, offset = 0) =>
    api.get(`/users/${username}/posts?limit=${limit}&offset=${offset}`),
};

// Messages
export const messageAPI = {
  sendMessage: (data: { recipient_id: number; content: string }) =>
    api.post('/messages', data),
  getMessages: (userId: number, limit = 50, offset = 0) =>
    api.get(`/messages/${userId}?limit=${limit}&offset=${offset}`),
  markAsRead: (messageId: number) => api.put(`/messages/${messageId}/read`),
};

export default api;
