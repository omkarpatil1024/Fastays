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
} from 'react-native';
import {useLogin} from './useLogin';
import THEME from '../../theme/theme';
import type {LoginScreenProps} from '../../types/navigation.types';

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
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
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={THEME.colors.text.disabled}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor={THEME.colors.text.disabled}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.eyeButton}
                  disabled={isLoading}>
                  <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={THEME.colors.text.light} />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.demoInfo}>
              <Text style={styles.demoText}>Demo Credentials:</Text>
              <Text style={styles.demoCredentials}>
                Email: demo@fastays.com
              </Text>
              <Text style={styles.demoCredentials}>Password: password123</Text>
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
  header: {
    marginBottom: THEME.spacing.xlarge,
  },
  title: {
    fontSize: THEME.typography.fontSize.h1,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
    marginBottom: THEME.spacing.small,
  },
  subtitle: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
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
  input: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.regular,
    padding: THEME.spacing.regular,
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.primary,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.regular,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  passwordInput: {
    flex: 1,
    padding: THEME.spacing.regular,
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  eyeButton: {
    padding: THEME.spacing.regular,
  },
  eyeText: {
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.borderRadius.regular,
    padding: THEME.spacing.regular,
    alignItems: 'center',
    marginTop: THEME.spacing.medium,
    ...THEME.shadows.medium,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: THEME.colors.text.light,
    fontSize: THEME.typography.fontSize.button,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  demoInfo: {
    marginTop: THEME.spacing.xlarge,
    padding: THEME.spacing.regular,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.regular,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  demoText: {
    fontSize: THEME.typography.fontSize.caption,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.tiny,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  demoCredentials: {
    fontSize: THEME.typography.fontSize.caption,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
});
