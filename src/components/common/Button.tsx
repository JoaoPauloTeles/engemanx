/**
 * Button Component
 * 
 * Clean Code:
 * - Reusable: Suporta múltiplas variantes
 * - Accessible: Feedback visual e loading state
 * - Consistent: Segue design system
 * 
 * Arquivo: src/components/common/Button.tsx
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { theme } from '../../theme';

// ============================================================================
// TYPES
// ============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  ...touchableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        fullWidth && styles.buttonFullWidth,
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'secondary'
              ? theme.colors.white
              : theme.colors.primary[600]
          }
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text
            style={[
              styles.text,
              styles[`text_${variant}`],
              styles[`text_${size}`],
              isDisabled && styles.textDisabled,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  // Base Button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.base,
    paddingHorizontal: theme.spacing[4],
    gap: theme.spacing[2],
  },

  // Variants
  button_primary: {
    backgroundColor: theme.colors.primary[600],
  },
  button_secondary: {
    backgroundColor: theme.colors.primary[700], // Usando primary[700] como secondary
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary[600],
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  button_sm: {
    minHeight: 36,
    paddingHorizontal: theme.spacing[3],
  },
  button_md: {
    minHeight: 48,
    paddingHorizontal: theme.spacing[4],
  },
  button_lg: {
    minHeight: 56,
    paddingHorizontal: theme.spacing[6],
  },

  // States
  buttonFullWidth: {
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  // Text Base
  text: {
    fontWeight: '600', // theme.typography.fontWeight.semibold
    textAlign: 'center',
  },

  // Text Variants
  text_primary: {
    color: theme.colors.white,
  },
  text_secondary: {
    color: theme.colors.white,
  },
  text_outline: {
    color: theme.colors.primary[600],
  },
  text_ghost: {
    color: theme.colors.primary[600],
  },

  // Text Sizes
  text_sm: {
    fontSize: theme.typography.fontSize.sm,
  },
  text_md: {
    fontSize: theme.typography.fontSize.base,
  },
  text_lg: {
    fontSize: theme.typography.fontSize.lg,
  },

  // Text States
  textDisabled: {
    opacity: 0.7,
  },
});