import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import THEME from '../../theme/theme';
import {Button} from '../../components/Button';
import type {OTPVerificationScreenProps} from '../../types/navigation.types';
import { useOTPVerification } from './useOTPVerification';

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = props => {
  const {
    otp,
    otpInputs,
    handleOTPChange,
    handleVerifyOTP,
    handleResendOTP,
    isLoading,
    isResending,
    timer,
    phoneNumber,
  } = useOTPVerification(props);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 4-digit code sent to{'\n'}
              <Text style={styles.phoneNumber}>+91 {phoneNumber}</Text>
            </Text>
          </View>

          <View style={styles.form}>
            {/* OTP Input Boxes */}
            <View style={styles.otpContainer}>
              {otpInputs.map((ref, index) => (
                <TextInput
                  key={index}
                  ref={ref}
                  style={[
                    styles.otpInput,
                    otp[index] && styles.otpInputFilled,
                  ]}
                  value={otp[index] || ''}
                  onChangeText={text => handleOTPChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  editable={!isLoading}
                  selectTextOnFocus
                />
              ))}
            </View>

            <Button
              title="Verify & Continue"
              onPress={handleVerifyOTP}
              loading={isLoading}
              disabled={isLoading || otp.join('').length !== 4}
              style={styles.verifyButton}
            />

            {/* Resend OTP */}
            <View style={styles.resendContainer}>
              {timer > 0 ? (
                <Text style={styles.timerText}>
                  Resend OTP in <Text style={styles.timerHighlight}>{timer}s</Text>
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={isResending}>
                  {isResending ? (
                    <ActivityIndicator size="small" color={THEME.colors.primary} />
                  ) : (
                    <Text style={styles.resendText}>Resend OTP</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>

            {/* Change Number */}
            <TouchableOpacity
              style={styles.changeNumberButton}
              onPress={() => props.navigation.goBack()}>
              <Text style={styles.changeNumberText}>Change Mobile Number</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: THEME.spacing.medium,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xlarge,
  },
  logo: {
    width: 100,
    height: 100,
  },
  header: {
    marginBottom: THEME.spacing.xlarge,
  },
  title: {
    fontSize: THEME.typography.fontSize.h2,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
    marginBottom: THEME.spacing.small,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
    textAlign: 'center',
    lineHeight: THEME.typography.lineHeight.regular,
  },
  phoneNumber: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
  },
  form: {
    width: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.xlarge,
    paddingHorizontal: THEME.spacing.medium,
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.regular,
    borderWidth: 2,
    borderColor: THEME.colors.border,
    fontSize: THEME.typography.fontSize.h3,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.text.primary,
    textAlign: 'center',
    fontFamily: THEME.typography.fontFamily.primary,
  },
  otpInputFilled: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.selected,
  },
  verifyButton: {
    marginTop: THEME.spacing.medium,
  },
  resendContainer: {
    marginTop: THEME.spacing.large,
    alignItems: 'center',
  },
  timerText: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  timerHighlight: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
  },
  resendText: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.primary,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  changeNumberButton: {
    marginTop: THEME.spacing.large,
    alignItems: 'center',
  },
  changeNumberText: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
    textDecorationLine: 'underline',
  },
});
