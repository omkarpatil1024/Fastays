import {useState, useRef, useEffect} from 'react';
import {Alert, TextInput} from 'react-native';
import {useApi} from '../../hooks/useApi';
import {authService} from '../../services/auth.service';
import type {OTPVerificationScreenProps} from '../../types/navigation.types';

export const useOTPVerification = ({navigation, route}: OTPVerificationScreenProps) => {
  const phoneNumber = route.params.phoneNumber;
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  
  // Create refs for OTP inputs
  const otpInputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const verifyOTPMutation = useApi.useMutation(
    (data: {phoneNumber: string; otp: string}) => authService.verifyOTP(data.phoneNumber, data.otp),
    {
      onSuccess: data => {
        if (data.success) {
          Alert.alert('Success', 'Login successful!');
          navigation.replace('Home');
        }
      },
      onError: (error: Error) => {
        Alert.alert('Error', error.message);
        // Clear OTP on error
        setOtp(['', '', '', '']);
        otpInputs[0].current?.focus();
      },
    },
  );

  const resendOTPMutation = useApi.useMutation(
    (phone: string) => authService.sendOTP(phone),
    {
      onSuccess: data => {
        if (data.success) {
          Alert.alert('Success', 'OTP resent successfully!');
          setTimer(30);
          setOtp(['', '', '', '']);
          otpInputs[0].current?.focus();
        }
      },
      onError: (error: Error) => {
        Alert.alert('Error', error.message);
      },
    },
  );

  const handleOTPChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      otpInputs[index + 1].current?.focus();
    }

    // Auto-submit when all 4 digits are entered
    if (text && index === 3 && newOtp.every(digit => digit !== '')) {
      handleVerifyOTP(newOtp.join(''));
    }
  };

  const handleVerifyOTP = (otpValue?: string) => {
    const otpString = otpValue || otp.join('');
    
    if (otpString.length !== 4) {
      Alert.alert('Validation Error', 'Please enter the complete 4-digit OTP');
      return;
    }

    verifyOTPMutation.mutate({phoneNumber, otp: otpString});
  };

  const handleResendOTP = () => {
    if (timer > 0) {
      return;
    }
    resendOTPMutation.mutate(phoneNumber);
  };

  return {
    otp,
    otpInputs,
    handleOTPChange,
    handleVerifyOTP: () => handleVerifyOTP(),
    handleResendOTP,
    isLoading: verifyOTPMutation.isPending,
    isResending: resendOTPMutation.isPending,
    timer,
    phoneNumber,
  };
};
