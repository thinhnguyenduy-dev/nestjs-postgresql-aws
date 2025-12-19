import apiClient from './api-client';

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  provider: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export const authApi = {
  // Register new user
  register: async (data: RegisterData) => {
    const response = await apiClient.post<{ user: User }>('/auth/register', data);
    return response.data;
  },

  // Login with email/password
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await apiClient.get<User>('/auth/profile');
    return response.data;
  },

  // OAuth login (redirect to backend)
  googleLogin: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  },

  facebookLogin: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
  },

  microsoftLogin: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/microsoft`;
  },
};
