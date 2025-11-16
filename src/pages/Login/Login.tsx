import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import {useLogin} from './useLogin';
import {Button} from '../../components/Button';
import THEME from '../../theme/theme';
import type {LoginScreenProps} from '../../types/navigation.types';

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const {
    phoneNumber,
    setPhoneNumber,
    handleSendOTP,
    isLoading,
  } = useLogin(props);

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
            <Text style={styles.title}>Welcome to Fastays</Text>
            <Text style={styles.subtitle}>Enter your mobile number to continue</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeContainer}>
                  <Image
                    source={require('../../assets/images/flag.png')}
                    style={styles.flagIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.countryCode}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter mobile number"
                  placeholderTextColor={THEME.colors.text.disabled}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!isLoading}
                />
              </View>
            </View>

            <Button
              title="Continue"
              onPress={handleSendOTP}
              loading={isLoading}
              disabled={isLoading}
              style={styles.continueButton}
            />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
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
    width: 120,
    height: 120,
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
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: THEME.spacing.medium,
  },
  label: {
    fontSize: THEME.typography.fontSize.body,
    fontWeight: THEME.typography.fontWeight.medium as any,
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.small,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.regular,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingHorizontal: THEME.spacing.regular,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: THEME.spacing.regular,
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
    marginRight: THEME.spacing.regular,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginRight: THEME.spacing.small,
  },
  countryCode: {
    fontSize: THEME.typography.fontSize.body,
    fontWeight: THEME.typography.fontWeight.medium as any,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  phoneInput: {
    flex: 1,
    padding: THEME.spacing.regular,
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  continueButton: {
    marginTop: THEME.spacing.medium,
  },
  termsContainer: {
    marginTop: THEME.spacing.xlarge,
    alignItems: 'center',
  },
  termsText: {
    fontSize: THEME.typography.fontSize.caption,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
    textAlign: 'center',
    lineHeight: THEME.typography.lineHeight.small,
  },
  termsLink: {
    color: THEME.colors.primary,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
  },
});
