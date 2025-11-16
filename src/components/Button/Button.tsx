import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  Text,
} from 'react-native';
import THEME from '../../theme/theme';

export interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${size}Button`]];

    if (disabled) {
      return [...baseStyle, styles.disabledButton];
    }

    switch (variant) {
      case 'secondary':
        return [...baseStyle, styles.secondaryButton];
      case 'outline':
        return [...baseStyle, styles.outlineButton];
      default:
        return [...baseStyle, styles.primaryButton];
    }
  };

  const getTextStyle = () => {
    if (disabled) {
      return [styles.text, styles.disabledText];
    }

    switch (variant) {
      case 'outline':
        return [styles.text, styles.outlineText];
      default:
        return [styles.text, styles.primaryText];
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={
            variant === 'outline'
              ? THEME.colors.primary
              : THEME.colors.text.light
          }
        />
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: THEME.borderRadius.regular,
    alignItems: 'center',
    justifyContent: 'center',
    ...THEME.shadows.medium,
  },
  primaryButton: {
    backgroundColor: THEME.colors.primary,
  },
  secondaryButton: {
    backgroundColor: THEME.colors.secondary,
  },
  outlineButton: {
    backgroundColor: THEME.colors.background,
    borderWidth: 2,
    borderColor: THEME.colors.primary,
  },
  disabledButton: {
    backgroundColor: THEME.colors.disabled,
    borderWidth: 0,
    opacity: 0.6,
  },
  smallButton: {
    paddingVertical: THEME.spacing.small,
    paddingHorizontal: THEME.spacing.medium,
  },
  mediumButton: {
    paddingVertical: THEME.spacing.regular,
    paddingHorizontal: THEME.spacing.large,
  },
  largeButton: {
    paddingVertical: THEME.spacing.medium,
    paddingHorizontal: THEME.spacing.xlarge,
  },
  text: {
    fontSize: THEME.typography.fontSize.button,
    fontFamily: THEME.typography.fontFamily.primary,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
  },
  primaryText: {
    color: THEME.colors.text.light,
  },
  outlineText: {
    color: THEME.colors.primary,
  },
  disabledText: {
    color: THEME.colors.text.disabled,
  },
});

export default Button;
