import {useEffect} from 'react';
import {authService} from '../../services/auth.service';
import type {SplashScreenProps} from '../../types/navigation.types';

export const useSplash = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const isAuthenticated = await authService.checkAuth();

      if (isAuthenticated) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      navigation.replace('Login');
    }
  };

  return {};
};
