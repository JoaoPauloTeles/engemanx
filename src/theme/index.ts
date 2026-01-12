/**
 * EngemanX Design System
 * Copie este conteúdo para: src/theme/index.ts
 */

export const colors = {
  primary: {
    500: '#1E82FF',
    600: '#0066E6',
    700: '#004DB3',
  },
  
  status: {
    ok: '#10B981',
    nok: '#EF4444',
    na: '#F59E0B',
    pending: '#6B7280',
    inProgress: '#3B82F6',
    completed: '#059669',
  },
  
  severity: {
    minor: '#10B981',
    moderate: '#F59E0B',
    serious: '#F97316',
    critical: '#DC2626',
  },
  
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  white: '#FFFFFF',
  black: '#000000',
  
  background: {
    primary: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
    dark: '#1F2937',
  },
  
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    disabled: '#D1D5DB',
  },
  
  border: {
    light: '#E5E7EB',
    default: '#D1D5DB',
    dark: '#9CA3AF',
  },
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

export function getResultColor(result: 'ok' | 'nok' | 'na'): string {
  return colors.status[result];
}

export function getSeverityColor(
  severity: 'minor' | 'moderate' | 'serious' | 'critical'
): string {
  return colors.severity[severity];
}