/**
 * Login Screen
 * 
 * Clean Code:
 * - Single Responsibility: Apenas lida com UI de login
 * - Separation of Concerns: Lógica no hook useAuth
 * - User-Friendly: Validação e feedback visual
 * 
 * Arquivo: src/screens/auth/LoginScreen.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import type { AuthStackScreenProps } from '../../types/navigation.types';

// ============================================================================
// TYPES
// ============================================================================

type Props = AuthStackScreenProps<'Login'>;

// ============================================================================
// COMPONENT
// ============================================================================

export function LoginScreen({ navigation }: Props) {
  const { signIn, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  /**
   * Valida os campos do formulário
   */
  function validateForm(): boolean {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    clearError();

    // Validate email
    if (!email.trim()) {
      setEmailError('Email é obrigatório');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Email inválido');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Senha é obrigatória');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Handle login button press
   */
  async function handleLogin() {
    if (!validateForm()) {
      return;
    }

    const success = await signIn(email, password);

    if (success) {
      // Navigation will happen automatically via auth state change
      console.log('Login successful!');
    } else {
      // Error is shown via error state
      console.log('Login failed');
    }
  }

  /**
   * Navigate to register screen
   */
  function handleRegister() {
    navigation.navigate('Register');
  }

  /**
   * Navigate to forgot password screen
   */
  function handleForgotPassword() {
    navigation.navigate('ForgotPassword');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>⚙️</Text>
          <Text style={styles.title}>EngemanX</Text>
          <Text style={styles.subtitle}>
            Sistema de Gestão de Manutenção Industrial
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
              clearError();
            }}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Text style={styles.inputIcon}>📧</Text>}
            editable={!loading}
          />

          <Input
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
              clearError();
            }}
            error={passwordError}
            isPassword
            leftIcon={<Text style={styles.inputIcon}>🔒</Text>}
            editable={!loading}
          />

          {/* Global Error */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          )}

          {/* Forgot Password Link */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            disabled={loading}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            onPress={handleLogin}
          >
            Entrar
          </Button>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Register Button */}
          <Button
            variant="outline"
            size="lg"
            fullWidth
            disabled={loading}
            onPress={handleRegister}
          >
            Criar nova conta
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ao continuar, você concorda com nossos{' '}
            <Text style={styles.footerLink}>Termos de Uso</Text> e{' '}
            <Text style={styles.footerLink}>Política de Privacidade</Text>
          </Text>
        </View>

        {/* Development Info */}
        {__DEV__ && (
          <View style={styles.devInfo}>
            <Text style={styles.devInfoText}>🔧 Modo Desenvolvimento</Text>
            <Text style={styles.devInfoText}>
              Teste: teste@engemanx.com / senha123
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Valida formato de email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing[6],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing[8],
  },
  logo: {
    fontSize: 64,
    marginBottom: theme.spacing[3],
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[600],
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  form: {
    marginBottom: theme.spacing[6],
  },
  inputIcon: {
    fontSize: 20,
  },
  errorContainer: {
    backgroundColor: theme.colors.error + '20',
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.base,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
    marginBottom: theme.spacing[4],
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing[4],
  },
  forgotPasswordText: {
    color: theme.colors.primary[600],
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing[4],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.default,
  },
  dividerText: {
    marginHorizontal: theme.spacing[3],
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
  },
  footer: {
    marginTop: theme.spacing[6],
  },
  footerText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeight.medium,
  },
  devInfo: {
    marginTop: theme.spacing[4],
    padding: theme.spacing[3],
    backgroundColor: theme.colors.warning + '20',
    borderRadius: theme.borderRadius.base,
    borderWidth: 1,
    borderColor: theme.colors.warning,
  },
  devInfoText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.warning,
    textAlign: 'center',
  },
});