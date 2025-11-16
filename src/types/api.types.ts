export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface HomeData {
  welcomeMessage: string;
  stats: {
    totalBookings: number;
    activeStays: number;
    completedStays: number;
  };
  recentStays: Stay[];
}

export interface Stay {
  id: string;
  title: string;
  location: string;
  checkIn: string;
  checkOut: string;
  price: number;
  image?: string;
  status: 'upcoming' | 'active' | 'completed';
}
