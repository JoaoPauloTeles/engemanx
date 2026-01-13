/**
 * EngemanX Mobile - App Principal
 * Integração com Sistema de Navegação
 * 
 * Arquivo: App.tsx (SUBSTITUIR O EXISTENTE)
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/theme';

// ============================================================================
// ERROR BOUNDARY (Simples)
// ============================================================================

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
    // TODO: Enviar para serviço de tracking (Sentry, etc)
  }

  render() {
    if (this.state.hasError) {
      // TODO: Criar tela de erro customizada
      return null;
    }

    return this.props.children;
  }
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaProvider>
          <StatusBar 
            style="light" 
            backgroundColor={theme.colors.primary[600]} 
          />
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});