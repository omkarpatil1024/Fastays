import {apiClient, API_CONFIG, STORAGE_KEYS} from './api.config';
import type {LoginRequest, LoginResponse, ApiResponse} from '../types/api.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dummy API service - simulates API calls
export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Dummy validation
    if (credentials.email === 'demo@fastays.com' && credentials.password === 'password123') {
      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: {
          user: {
            id: '1',
            email: credentials.email,
            name: 'Demo User',
            avatar: 'https://i.pravatar.cc/150?img=1',
            createdAt: new Date().toISOString(),
          },
          token: 'dummy_auth_token_' + Date.now(),
          refreshToken: 'dummy_refresh_token_' + Date.now(),
        },
        message: 'Login successful',
      };

      // Store tokens
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));

      return response;
    }

    throw new Error('Invalid credentials. Use demo@fastays.com / password123');
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_DATA,
    ]);
  },

  checkAuth: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  },

  getCurrentUser: async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },
};

// For real API implementation, uncomment below:
/*
export const authService = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return apiClient.post<ApiResponse<LoginResponse>>(
      API_CONFIG.ENDPOINTS.LOGIN,
      credentials,
    );
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_CONFIG.ENDPOINTS.LOGOUT);
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_DATA,
    ]);
  },

  checkAuth: async (): Promise<boolean> => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  },
};
*/
