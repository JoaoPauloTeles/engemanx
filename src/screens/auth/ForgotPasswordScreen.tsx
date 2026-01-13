/**
 * Forgot Password Screen - COM VERIFICAÇÃO DE EMAIL
 * 
 * ⚠️ WARNING: Esta abordagem tem implicações de segurança
 * - Permite enumeration attacks
 * - Expõe quais emails estão cadastrados
 * - Use apenas em ambientes corporativos internos
 * 
 * Arquivo: src/screens/auth/ForgotPasswordScreen.tsx (OPÇÃO COM VERIFICAÇÃO)
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
import { showSuccessAlert, showErrorAlert } from '../../utils/alert.utils';
import { supabase } from '../../services/supabase';
import type { AuthStackScreenProps } from '../../types/navigation.types';

// ============================================================================
// TYPES
// ============================================================================

type Props = AuthStackScreenProps<'ForgotPassword'>;

// ============================================================================
// COMPONENT
// ============================================================================

export function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Valida o email
   */
  function validateEmail(): boolean {
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email é obrigatório');
      return false;
    }

    if (!isValidEmail(email)) {
      setEmailError('Email inválido');
      return false;
    }

    return true;
  }

  /**
   * Verifica se o email existe na base de dados
   * ⚠️ WARNING: Implicações de segurança!
   */
  async function checkEmailExists(emailToCheck: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', emailToCheck.trim().toLowerCase())
        .maybeSingle();

      if (error) {
        console.error('Error checking email:', error);
        return false;
      }

      return data !== null;
    } catch (error) {
      console.error('Unexpected error checking email:', error);
      return false;
    }
  }

  /**
   * Mostra alerta de sucesso
   */
  function showSuccessMessage(): void {
    const message = `Um link de recuperação foi enviado para:\n\n${email}\n\nVerifique sua caixa de entrada e siga as instruções para redefinir sua senha.`;
    
    showSuccessAlert(
      '✅ Email Enviado!',
      message,
      redirectToLogin
    );
  }

  /**
   * Mostra alerta quando email não está cadastrado
   */
  function showEmailNotFoundMessage(): void {
    const message = `O email ${email} não está cadastrado em nossa plataforma.\n\nVerifique se digitou corretamente ou crie uma nova conta.`;
    
    showErrorAlert(
      '❌ Email Não Encontrado',
      message
    );
  }

  /**
   * Mostra alerta de erro genérico
   */
  function showErrorMessage(errorMessage: string): void {
    showErrorAlert(
      '❌ Erro ao Enviar Email',
      errorMessage
    );
  }

  /**
   * Redireciona para login
   */
  function redirectToLogin(): void {
    navigation.navigate('Login');
  }

  /**
   * Envia email de recuperação
   * COM verificação prévia se email existe
   */
  async function handleSendResetEmail() {
    if (!validateEmail()) {
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ PRIMEIRO: Verifica se email existe
      const emailExists = await checkEmailExists(email);

      if (!emailExists) {
        setLoading(false);
        showEmailNotFoundMessage();
        return;
      }

      // 2️⃣ SEGUNDO: Email existe, envia recuperação
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      setLoading(false);

      if (error) {
        console.error('Reset password error:', error);
        showErrorMessage(getErrorMessage(error.message));
      } else {
        showSuccessMessage();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setLoading(false);
      showErrorMessage('Erro ao enviar email. Tente novamente.');
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🔑</Text>
            <Text style={styles.title}>Esqueceu a Senha?</Text>
            <Text style={styles.subtitle}>
              Digite seu email para receber instruções de recuperação
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
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              leftIcon={<Text style={styles.inputIcon}>📧</Text>}
              editable={!loading}
            />

            {/* Warning Box */}
            <View style={styles.warningBox}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warningText}>
                Verificaremos se este email está cadastrado antes de enviar instruções.
              </Text>
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={styles.infoText}>
                Você receberá um email com um link para redefinir sua senha.
                O link expira em 60 minutos.
              </Text>
            </View>

            {/* Send Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              onPress={handleSendResetEmail}
            >
              Enviar Email de Recuperação
            </Button>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Back to Login Button */}
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              disabled={loading}
              onPress={handleBackToLogin}
            >
              Voltar para Login
            </Button>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Email não cadastrado?{' '}
              <Text 
                style={styles.footerLink}
                onPress={() => navigation.navigate('Register')}
              >
                Criar nova conta
              </Text>
            </Text>
          </View>

          {/* Development Info */}
          {__DEV__ && (
            <View style={styles.devInfo}>
              <Text style={styles.devInfoText}>🔧 Modo Desenvolvimento</Text>
              <Text style={styles.devInfoText}>
                ⚠️ Verificação de email habilitada
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

/**
 * Valida formato de email
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Traduz mensagens de erro para português
 */
function getErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    'Invalid email': 'Email inválido',
    'Email not confirmed': 'Email não confirmado',
    'Too many requests': 'Muitas tentativas. Aguarde alguns minutos.',
  };

  return errorMessages[error] || 'Erro ao enviar email. Tente novamente.';
}

// ============================================================================
// STYLES
// ============================================================================

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
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
    paddingHorizontal: theme.spacing[4],
  },
  form: {
    marginBottom: theme.spacing[6],
  },
  inputIcon: {
    fontSize: 20,
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.warning + '20',
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.base,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
    marginBottom: theme.spacing[3],
  },
  warningIcon: {
    fontSize: 20,
    marginRight: theme.spacing[2],
  },
  warningText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.warning,
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: theme.colors.info + '20',
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.base,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.info,
    marginBottom: theme.spacing[4],
  },
  infoIcon: {
    fontSize: 20,
    marginRight: theme.spacing[2],
  },
  infoText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.info,
    lineHeight: 20,
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