import { useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { 
  signIn as authSignIn, 
  signOut as authSignOut, 
  signUp as authSignUp, 
  getSession 
} from '../services/auth.api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Check current session
    getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitializing(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { user, session, error } = await authSignIn(email, password);

    setLoading(false);

    if (error) {
      setError(error);
      return false;
    }

    setUser(user);
    setSession(session);
    return true;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);

    const { user, error } = await authSignUp(email, password, fullName);

    setLoading(false);

    if (error) {
      setError(error);
      return false;
    }

    return true;
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await authSignOut();
    setLoading(false);

    if (error) {
      setError(error);
      return false;
    }

    setUser(null);
    setSession(null);
    return true;
  };

  const clearError = () => {
    setError(null);
  };

  return {
    user,
    session,
    loading,
    error,
    initializing,
    signIn,
    signUp,
    signOut,
    clearError,
    isAuthenticated: !!user,
  };
}