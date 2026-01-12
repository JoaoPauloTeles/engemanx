/**
 * EngemanX Mobile - App Principal
 * SUBSTITUA o App.tsx existente por este conteúdo
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>EngemanX Mobile</Text>
          <Text style={styles.subtitle}>CIL Operations App</Text>
          <Text style={styles.info}>✅ Setup inicial completo!</Text>
          <Text style={styles.info}>📱 Pronto para desenvolvimento</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#1E82FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 32,
  },
  info: {
    fontSize: 16,
    color: '#FFFFFF',
    marginVertical: 4,
  },
});