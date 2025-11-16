import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTPVerification: {phoneNumber: string};
  Home: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type OTPVerificationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OTPVerification'
>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
