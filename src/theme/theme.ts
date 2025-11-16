import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const FONT_FAMILIES = {
  primary: Platform.select({
    ios: 'Inter',
    android: 'Inter',
    default: 'Arial',
  }),
  secondary: Platform.select({
    ios: 'Montserrat',
    android: 'Montserrat',
    default: 'Arial',
  }),
  fallback: Platform.select({
    ios: 'Arial',
    android: 'sans-serif',
  }),
};

const FONT_WEIGHTS = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

const SHARED_THEME = {
  typography: {
    fontFamily: FONT_FAMILIES,
    fontWeight: FONT_WEIGHTS,
    fontSize: {
      h1: 32,
      h2: 26,
      h3: 22,
      h4: 20,
      h5: 18,
      body: 16,
      caption: 14,
      button: 16,
    },
    lineHeight: {
      small: 20,
      regular: 24,
      large: 28,
      xlarge: 32,
    },
  },
  spacing: {
    tiny: 4,
    small: 8,
    regular: 16,
    medium: 24,
    large: 32,
    xlarge: 40,
    xxlarge: 48,
    bottomSpace: 100,
  },
  borderRadius: {
    tiny: 4,
    small: 8,
    regular: 12,
    medium: 16,
    large: 20,
    circle: 1000,
  },
  screen: {
    width,
    height,
    isSmallDevice: width < 375,
  },
  layout: {
    containerPadding: 16,
    maxContentWidth: 500,
  },
};

const APP_THEME = {
  ...SHARED_THEME,
  colors: {
    primary: '#883bc4',
    secondary: '#4CAF50',
    background: '#F5F5F5',
    card: '#FFFFFF',
    surface: '#FAFAFA',
    selected: '#E3F2FD',
    overlay: 'rgba(0, 0, 0, 0.5)',
    text: {
      primary: '#212121',
      secondary: '#424242',
      light: '#FFFFFF',
      disabled: '#BDBDBD',
      inverse: '#FFFFFF',
    },
    border: '#E0E0E0',
    success: '#4CAF50',
    shadow: '#BDBDBD',
    error: '#E53935',
    warning: '#FFA000',
    info: '#1E88E5',
    disabled: '#E0E0E0',
    transparent: 'transparent',
  },
  shadows: {
    small: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
      },
      android: {
        elevation: 3,
        shadowColor: '#000',
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
      },
    }),
    medium: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 4.65,
        elevation: 4,
      },
      android: {
        elevation: 5,
        shadowColor: '#000',
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
      },
    }),
    large: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.2,
        shadowRadius: 7.49,
        elevation: 8,
      },
      android: {
        elevation: 10,
        shadowColor: '#000',
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
      },
    }),
  },
};

export type Theme = typeof APP_THEME;
export type ThemeColors = typeof APP_THEME.colors;
export type ThemeTypography = typeof APP_THEME.typography;
export type ThemeSpacing = typeof APP_THEME.spacing;
export type ThemeBorderRadius = typeof APP_THEME.borderRadius;
export type ThemeShadows = typeof APP_THEME.shadows;

export const THEME = APP_THEME;
export default THEME;
