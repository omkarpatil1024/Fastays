import React from 'react';
import { View, Image, StatusBar, StyleSheet, Dimensions } from 'react-native';
import THEME from '../../theme/theme';
import { useSplash } from './useSplash';
import type { SplashScreenProps } from '../../types/navigation.types';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  useSplash(props);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image 
        source={require('../../assets/images/splash.png')} 
        style={styles.backgroundImage} 
      />
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  logo: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    position: 'absolute',
    alignSelf: 'center',
    top: windowHeight * 0.15,
    resizeMode: 'contain',
  },
});
