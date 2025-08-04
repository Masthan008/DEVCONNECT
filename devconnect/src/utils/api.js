import { io } from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const isFormData = options.body instanceof FormData;
  
  const config = {
    headers: {
      // Only set Content-Type to application/json if not FormData
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  getCurrentUser: () => apiRequest('/auth/me'),

  updateProfile: (updates) => apiRequest('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
};

// Users API
export const usersAPI = {
  getAllUsers: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users?${queryString}`);
  },

  getUserById: (id) => apiRequest(`/users/${id}`),

  getUserByUsername: (username) => apiRequest(`/users/username/${username}`),

  followUser: (id) => apiRequest(`/users/${id}/follow`, {
    method: 'POST',
  }),

  getSuggestedUsers: () => apiRequest('/users/suggested/users'),

  getFollowers: (id) => apiRequest(`/users/${id}/followers`),

  getFollowing: (id) => apiRequest(`/users/${id}/following`),
};

// Posts API
export const postsAPI = {
  getAllPosts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/posts?${queryString}`);
  },

  getPostById: (id) => apiRequest(`/posts/${id}`),

  createPost: (postData) => {
    // Check if postData is FormData
    const isFormData = postData instanceof FormData;
    
    return apiRequest('/posts', {
      method: 'POST',
      body: isFormData ? postData : JSON.stringify(postData),
      headers: isFormData ? {} : undefined, // Let browser set Content-Type for FormData
    });
  },

  updatePost: (id, updates) => apiRequest(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),

  deletePost: (id) => apiRequest(`/posts/${id}`, {
    method: 'DELETE',
  }),

  likePost: (id) => apiRequest(`/posts/${id}/like`, {
    method: 'POST',
  }),

  addComment: (id, content) => apiRequest(`/posts/${id}/comment`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }),

  getFeed: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/posts/feed/me?${queryString}`);
  },
};

// Messages API
export const messagesAPI = {
  sendMessage: (messageData) => apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(messageData),
  }),

  getConversations: () => apiRequest('/messages/conversations'),

  getConversation: (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/messages/conversation/${userId}?${queryString}`);
  },

  getUnreadCount: () => apiRequest('/messages/unread/count'),

  markAsRead: (id) => apiRequest(`/messages/${id}/read`, {
    method: 'PUT',
  }),

  deleteMessage: (id) => apiRequest(`/messages/${id}`, {
    method: 'DELETE',
  }),

  getRecentMessages: () => apiRequest('/messages/recent'),
};

// Upload API
export const uploadAPI = {
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiRequest('/upload/avatar', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type
    });
  },

  uploadCover: (file) => {
    const formData = new FormData();
    formData.append('cover', file);
    return apiRequest('/upload/cover', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },

  uploadPostImages: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    return apiRequest('/upload/post-images', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },
};

// Socket.io connection for real-time messaging

export const socketService = {
  socket: null,

  connect() {
    if (this.socket) return this.socket;

    this.socket = io('http://localhost:5000', {
      auth: {
        token: getAuthToken()
      }
    });

    return this.socket;
  },

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },

  joinRoom(roomId) {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  },

  sendMessage(roomId, message) {
    if (this.socket) {
      this.socket.emit('send_message', { roomId, message });
    }
  },

  onMessage(callback) {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  },

  onTyping(callback) {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  },

  onStopTyping(callback) {
    if (this.socket) {
      this.socket.on('user_stop_typing', callback);
    }
  },
};

// Auth utilities
export const authUtils = {
  isAuthenticated: () => !!localStorage.getItem('token'),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    socketService.disconnect();
  },

  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

export default apiRequest;
