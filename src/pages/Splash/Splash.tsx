import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useSplash} from './useSplash';
import THEME from '../../theme/theme';
import type {SplashScreenProps} from '../../types/navigation.types';

export const SplashScreen: React.FC<SplashScreenProps> = props => {
  useSplash(props);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>Fastays</Text>
        <Text style={styles.tagline}>Your Perfect Stay Awaits</Text>
        <ActivityIndicator
          size="large"
          color={THEME.colors.primary}
          style={styles.loader}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: THEME.typography.fontSize.h1,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.primary,
    fontFamily: THEME.typography.fontFamily.primary,
    marginBottom: THEME.spacing.small,
  },
  tagline: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
    fontWeight: THEME.typography.fontWeight.regular as any,
  },
  loader: {
    marginTop: THEME.spacing.xlarge,
  },
});
