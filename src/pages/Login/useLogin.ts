import {useState} from 'react';
import {Alert} from 'react-native';
import {useApi} from '../../hooks/useApi';
import {authService} from '../../services/auth.service';
import type {LoginScreenProps} from '../../types/navigation.types';
import type {LoginRequest} from '../../types/api.types';

export const useLogin = ({navigation}: LoginScreenProps) => {
  const [email, setEmail] = useState('demo@fastays.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useApi.useMutation(
    (credentials: LoginRequest) => authService.login(credentials),
    {
      onSuccess: data => {
        if (data.success) {
          navigation.replace('Home');
        }
      },
      onError: (error: Error) => {
        Alert.alert('Login Failed', error.message);
      },
    },
  );

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    loginMutation.mutate({email, password});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    isLoading: loginMutation.isPending,
  };
};
