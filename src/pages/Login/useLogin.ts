import {useState} from 'react';
import {Alert} from 'react-native';
import {useApi} from '../../hooks/useApi';
import {authService} from '../../services/auth.service';
import type {LoginScreenProps} from '../../types/navigation.types';

export const useLogin = ({navigation}: LoginScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendOTPMutation = useApi.useMutation(
    (phone: string) => authService.sendOTP(phone),
    {
      onSuccess: data => {
        if (data.success) {
          Alert.alert('Success', 'OTP sent successfully!');
          navigation.navigate('OTPVerification', {phoneNumber});
        }
      },
      onError: (error: Error) => {
        Alert.alert('Error', error.message);
      },
    },
  );

  const handleSendOTP = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (!/^\d+$/.test(phoneNumber)) {
      Alert.alert('Validation Error', 'Mobile number should contain only digits');
      return;
    }

    sendOTPMutation.mutate(phoneNumber);
  };

  return {
    phoneNumber,
    setPhoneNumber,
    handleSendOTP,
    isLoading: sendOTPMutation.isPending,
  };
};
