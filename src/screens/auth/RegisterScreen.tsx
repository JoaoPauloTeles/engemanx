/**
 * Register Screen (VERSÃO FINAL CORRIGIDA)
 * 
 * Clean Code + Cross-Platform Alert
 * 
 * Arquivo: src/screens/auth/RegisterScreen.tsx (SUBSTITUIR COMPLETO)
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { showSuccessAlert } from '../../utils/alert.utils';
import type { AuthStackScreenProps } from '../../types/navigation.types';

// ============================================================================
// TYPES
// ============================================================================

type Props = AuthStackScreenProps<'Register'>;

// ============================================================================
// LOGGING HELPER
// ============================================================================

function logDebug(location: string, message: string, data?: any): void {
  console.log(`🔍 [RegisterScreen.${location}] ${message}`, data || '');
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RegisterScreen({ navigation }: Props) {
  const { signUp, loading, error, clearError } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  /**
   * Valida os campos do formulário
   */
  function validateForm(): boolean {
    logDebug('validateForm', 'Iniciando validação');
    
    let isValid = true;

    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    clearError();

    if (!fullName.trim()) {
      setFullNameError('Nome completo é obrigatório');
      isValid = false;
    } else if (fullName.trim().length < 3) {
      setFullNameError('Nome deve ter pelo menos 3 caracteres');
      isValid = false;
    } else if (!hasFullName(fullName)) {
      setFullNameError('Digite nome e sobrenome');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('Email é obrigatório');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Email inválido');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Senha é obrigatória');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      isValid = false;
    } else if (!hasNumber(password)) {
      setPasswordError('Senha deve conter pelo menos um número');
      isValid = false;
    } else if (!hasUpperCase(password)) {
      setPasswordError('Senha deve conter pelo menos uma letra maiúscula');
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirme sua senha');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não conferem');
      isValid = false;
    }

    logDebug('validateForm', 'Validação concluída', { isValid });
    return isValid;
  }

  /**
   * Mostra alerta de confirmação de email
   */
  function showEmailConfirmationAlert(userEmail: string): void {
    logDebug('showEmailConfirmationAlert', 'Mostrando Alert', { userEmail });
    
    const message = `Um email de confirmação foi enviado para:\n\n${userEmail}\n\nPor favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.`;
    
    showSuccessAlert(
      '✅ Conta Criada com Sucesso!',
      message,
      () => {
        logDebug('showEmailConfirmationAlert', 'Botão OK pressionado');
        redirectToLogin();
      }
    );
    
    logDebug('showEmailConfirmationAlert', 'Alert chamado');
  }

  /**
   * Redireciona para login
   */
  function redirectToLogin(): void {
    logDebug('redirectToLogin', 'Navegando para Login');
    navigation.navigate('Login');
  }

  /**
   * Processa cadastro bem-sucedido
   */
  function handleSuccessfulRegistration(): void {
    logDebug('handleSuccessfulRegistration', 'Cadastro bem-sucedido');
    showEmailConfirmationAlert(email);
  }

  /**
   * Handle register button
   */
  async function handleRegister() {
    logDebug('handleRegister', 'Botão pressionado');
    
    if (!validateForm()) {
      logDebug('handleRegister', 'Validação falhou');
      return;
    }

    logDebug('handleRegister', 'Chamando signUp');
    const success = await signUp(email, password, fullName);
    logDebug('handleRegister', 'signUp retornou', { success });

    if (success) {
      handleSuccessfulRegistration();
    } else {
      logDebug('handleRegister', 'Falha no cadastro', { error });
    }
  }

  /**
   * Volta para login
   */
  function handleBackToLogin() {
    navigation.goBack();
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
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.logo}>⚙️</Text>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
              Preencha os dados abaixo para começar
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Nome Completo"
              placeholder="João da Silva"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setFullNameError('');
                clearError();
              }}
              error={fullNameError}
              autoCapitalize="words"
              autoCorrect={false}
              leftIcon={<Text style={styles.inputIcon}>👤</Text>}
              editable={!loading}
            />

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
              helperText="Mínimo 6 caracteres, 1 número e 1 maiúscula"
              editable={!loading}
            />

            <Input
              label="Confirmar Senha"
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setConfirmPasswordError('');
                clearError();
              }}
              error={confirmPasswordError}
              isPassword
              leftIcon={<Text style={styles.inputIcon}>🔒</Text>}
              editable={!loading}
            />

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>⚠️ {error}</Text>
              </View>
            )}

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              onPress={handleRegister}
            >
              Criar Conta
            </Button>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              variant="ghost"
              size="lg"
              fullWidth
              disabled={loading}
              onPress={handleBackToLogin}
            >
              Já tenho uma conta
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Ao criar uma conta, você concorda com nossos{' '}
              <Text style={styles.footerLink}>Termos de Uso</Text> e{' '}
              <Text style={styles.footerLink}>Política de Privacidade</Text>
            </Text>
          </View>

          {__DEV__ && (
            <View style={styles.devInfo}>
              <Text style={styles.devInfoText}>🔧 Modo Desenvolvimento</Text>
              <Text style={styles.devInfoText}>
                Criar conta de teste para acessar o app
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ============================================================================
// HELPERS
// ============================================================================

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function hasFullName(name: string): boolean {
  const parts = name.trim().split(' ');
  return parts.length >= 2 && parts.every(part => part.length > 0);
}

function hasNumber(password: string): boolean {
  return /\d/.test(password);
}

function hasUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

// ============================================================================
// STYLES
// ============================================================================

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing[6],
  },
  contentContainer: {
    width: '100%',
    maxWidth: Math.min(width * 0.7, 500),
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