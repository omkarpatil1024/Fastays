import {apiClient, API_CONFIG} from './api.config';
import type {HomeData, ApiResponse} from '../types/api.types';

// Dummy API service - simulates API calls
export const homeService = {
  getHomeData: async (): Promise<ApiResponse<HomeData>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response: ApiResponse<HomeData> = {
      success: true,
      data: {
        welcomeMessage: 'Welcome back to Fastays!',
        stats: {
          totalBookings: 12,
          activeStays: 2,
          completedStays: 10,
        },
        recentStays: [
          {
            id: '1',
            title: 'Luxury Beach Villa',
            location: 'Malibu, California',
            checkIn: '2024-12-01',
            checkOut: '2024-12-05',
            price: 450,
            image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400',
            status: 'upcoming',
          },
          {
            id: '2',
            title: 'Mountain Cabin Retreat',
            location: 'Aspen, Colorado',
            checkIn: '2024-11-15',
            checkOut: '2024-11-20',
            price: 320,
            image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=400',
            status: 'active',
          },
          {
            id: '3',
            title: 'Downtown Loft',
            location: 'New York, NY',
            checkIn: '2024-10-10',
            checkOut: '2024-10-15',
            price: 280,
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
            status: 'completed',
          },
        ],
      },
      message: 'Home data fetched successfully',
    };

    return response;
  },
};

// For real API implementation, uncomment below:
/*
export const homeService = {
  getHomeData: async (): Promise<ApiResponse<HomeData>> => {
    return apiClient.get<ApiResponse<HomeData>>(API_CONFIG.ENDPOINTS.HOME_DATA);
  },
};
*/
