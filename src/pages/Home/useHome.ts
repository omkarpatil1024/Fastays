import {Alert} from 'react-native';
import {useApi} from '../../hooks/useApi';
import {homeService} from '../../services/home.service';
import {authService} from '../../services/auth.service';
import type {HomeScreenProps} from '../../types/navigation.types';

export const useHome = ({navigation}: HomeScreenProps) => {
  const {data, isLoading, error, refetch} = useApi.useQuery(
    ['homeData'],
    () => homeService.getHomeData(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  );

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await authService.logout();
          navigation.replace('Login');
        },
      },
    ]);
  };

  const handleRefresh = () => {
    refetch();
  };

  return {
    homeData: data?.data,
    isLoading,
    error,
    handleLogout,
    handleRefresh,
  };
};
