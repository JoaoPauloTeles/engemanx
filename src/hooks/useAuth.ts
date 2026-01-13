/**
 * Authentication Hook
 * 
 * Clean Code:
 * - Single Responsibility: Apenas gerencia estado de autenticação
 * - Meaningful Names: Funções claras (signIn, signOut, etc)
 * - Error Handling: Tratamento de erros consistente
 * 
 * Arquivo: src/hooks/useAuth.ts
 */

import { useState, useEffect } from 'react';
import { supabase, getCurrentUser } from '../services/supabase';
import type { User } from '@supabase/supabase-js';

// ============================================================================
// TYPES
// ============================================================================

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

// ============================================================================
// HOOK
// ============================================================================

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Check initial session
  useEffect(() => {
    checkUser();

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setState(prev => ({
            ...prev,
            user: session.user,
            loading: false,
            error: null,
          }));
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            loading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  /**
   * Check if user is already authenticated
   */
  async function checkUser() {
    try {
      const user = await getCurrentUser();
      setState({
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error checking user:', error);
      setState({
        user: null,
        loading: false,
        error: null,
      });
    }
  }

  /**
   * Sign in with email and password
   * Returns true if successful, false otherwise
   */
  async function signIn(email: string, password: string): Promise<boolean> {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: getErrorMessage(error.message),
        }));
        return false;
      }

      if (data.user) {
        setState({
          user: data.user,
          loading: false,
          error: null,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao fazer login. Tente novamente.',
      }));
      return false;
    }
  }

  /**
   * Sign up new user
   * Returns true if successful, false otherwise
   */
  async function signUp(
    email: string,
    password: string,
    fullName: string
  ): Promise<boolean> {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // 1. Create auth user
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: getErrorMessage(error.message),
        }));
        return false;
      }

      if (data.user) {
        // 2. Create user record in public.users table
        // This should be done via database trigger or RPC
        // For now, just return success
        setState({
          user: data.user,
          loading: false,
          error: null,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Sign up error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao criar conta. Tente novamente.',
      }));
      return false;
    }
  }

  /**
   * Sign out current user
   */
  async function signOut(): Promise<void> {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Erro ao fazer logout.',
      }));
    }
  }

  /**
   * Clear error message
   */
  function clearError() {
    setState(prev => ({ ...prev, error: null }));
  }

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    clearError,
  };
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Traduz mensagens de erro do Supabase para português
 */
function getErrorMessage(error: string): string {
  const errorMessages: Record<string, string> = {
    'Invalid login credentials': 'Email ou senha incorretos',
    'Email not confirmed': 'Email não confirmado. Verifique sua caixa de entrada.',
    'User already registered': 'Este email já está cadastrado',
    'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres',
    'Unable to validate email address: invalid format': 'Email inválido',
  };

  return errorMessages[error] || 'Ocorreu um erro. Tente novamente.';
}