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

  sendOTP: async (phoneNumber: string): Promise<ApiResponse<{otpSent: boolean}>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, accept any 10-digit phone number
    if (phoneNumber && phoneNumber.length === 10) {
      // Store the phone number temporarily for OTP verification
      await AsyncStorage.setItem('TEMP_PHONE_NUMBER', phoneNumber);
      
      // In a real app, the OTP would be sent via SMS
      // For demo, we'll use a fixed OTP: 1234
      console.log('Demo OTP: 1234');
      
      return {
        success: true,
        data: {
          otpSent: true,
        },
        message: 'OTP sent successfully. Use 1234 for demo.',
      };
    }

    throw new Error('Invalid phone number');
  },

  verifyOTP: async (phoneNumber: string, otp: string): Promise<ApiResponse<LoginResponse>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, accept OTP: 1234
    if (otp === '1234') {
      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: {
          user: {
            id: '1',
            email: `user_${phoneNumber}@fastays.com`,
            name: 'User',
            phone: phoneNumber,
            avatar: 'https://i.pravatar.cc/150?img=1',
            createdAt: new Date().toISOString(),
          },
          token: 'dummy_auth_token_' + Date.now(),
          refreshToken: 'dummy_refresh_token_' + Date.now(),
        },
        message: 'OTP verified successfully',
      };

      // Store tokens and user data
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      
      // Clear temporary phone number
      await AsyncStorage.removeItem('TEMP_PHONE_NUMBER');

      return response;
    }

    throw new Error('Invalid OTP. Use 1234 for demo.');
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
