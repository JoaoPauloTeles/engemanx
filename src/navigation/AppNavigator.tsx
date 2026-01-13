/**
 * Main Navigation Configuration
 * 
 * Clean Code Principles:
 * - Separation of Concerns: Cada navigator em sua própria função
 * - Single Responsibility: Apenas navegação, sem lógica de negócio
 * - Meaningful Names: Nomes claros indicam propósito
 * 
 * Arquivo: src/navigation/AppNavigator.tsx
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LoginScreen } from '../screens/auth/LoginScreen';


import { theme } from '../theme';
import type {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  RoutesStackParamList,
  AnomaliesStackParamList,
  LubricationStackParamList,
} from '../types/navigation.types';

// ============================================================================
// PLACEHOLDER SCREENS (Temporários - serão implementados nas próximas fases)
// ============================================================================

interface PlaceholderProps {
  title: string;
  subtitle?: string;
  navigation?: any;
}

const PlaceholderScreen: React.FC<PlaceholderProps> = ({ 
  title, 
  subtitle = 'Em desenvolvimento...', 
  navigation 
}) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderTitle}>{title}</Text>
    <Text style={styles.placeholderSubtitle}>{subtitle}</Text>
    {navigation?.canGoBack() && (
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Voltar</Text>
      </TouchableOpacity>
    )}
  </View>
);



const RegisterScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Cadastro" navigation={navigation} />
);

const ForgotPasswordScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Recuperar Senha" navigation={navigation} />
);

// Routes Screens
const RoutesListScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Minhas Rotas CIL" subtitle="Lista de rotas do dia" />
);

const RouteDetailsScreen = ({ navigation, route }: any) => (
  <PlaceholderScreen 
    title="Detalhes da Rota" 
    subtitle={`Rota ID: ${route.params?.routeId || 'N/A'}`}
    navigation={navigation}
  />
);

const RouteExecutionScreen = ({ navigation, route }: any) => (
  <PlaceholderScreen 
    title="Executar Rota" 
    subtitle="Lista de equipamentos"
    navigation={navigation}
  />
);

const ChecklistExecutionScreen = ({ navigation, route }: any) => (
  <PlaceholderScreen 
    title="Checklist" 
    subtitle={`Equipamento: ${route.params?.equipmentTag || 'N/A'}`}
    navigation={navigation}
  />
);

const RouteHistoryScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Histórico" navigation={navigation} />
);

// Anomalies Screens
const AnomaliesListScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Anomalias" subtitle="Anomalias abertas" />
);

const AnomalyDetailScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Detalhes da Anomalia" navigation={navigation} />
);

const AnomalyCreateScreen = ({ navigation, route }: any) => (
  <PlaceholderScreen 
    title="Registrar Anomalia" 
    subtitle={`Equipamento: ${route.params?.equipmentTag || 'N/A'}`}
    navigation={navigation}
  />
);

// Lubrication Screens
const LubricationListScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Pontos de Lubrificação" subtitle="Lubrificações do dia" />
);

const LubricationPointScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Ponto de Lubrificação" navigation={navigation} />
);

const LubricationExecutionScreen = ({ navigation, route }: any) => (
  <PlaceholderScreen 
    title="Executar Lubrificação" 
    subtitle={`Equipamento: ${route.params?.equipmentTag || 'N/A'}`}
    navigation={navigation}
  />
);

// Profile Screen
const ProfileScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Perfil" subtitle="Configurações do usuário" />
);

// ============================================================================
// STACK NAVIGATORS
// ============================================================================

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const RoutesStack = createStackNavigator<RoutesStackParamList>();
const AnomaliesStack = createStackNavigator<AnomaliesStackParamList>();
const LubricationStack = createStackNavigator<LubricationStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// ============================================================================
// SCREEN OPTIONS (Estilos padrão)
// ============================================================================

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary[600],
  },
  headerTintColor: theme.colors.white,
  headerTitleStyle: {
    fontWeight: '600' as const,
  },
};

// ============================================================================
// AUTH NAVIGATOR
// ============================================================================

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background.primary },
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

// ============================================================================
// ROUTES NAVIGATOR
// ============================================================================

function RoutesNavigator() {
  return (
    <RoutesStack.Navigator screenOptions={defaultScreenOptions}>
      <RoutesStack.Screen
        name="RoutesList"
        component={RoutesListScreen}
        options={{ title: 'Minhas Rotas' }}
      />
      <RoutesStack.Screen
        name="RouteDetails"
        component={RouteDetailsScreen}
        options={{ title: 'Detalhes da Rota' }}
      />
      <RoutesStack.Screen
        name="RouteExecution"
        component={RouteExecutionScreen}
        options={{ title: 'Executar Rota' }}
      />
      <RoutesStack.Screen
        name="ChecklistExecution"
        component={ChecklistExecutionScreen}
        options={({ route }) => ({ 
          title: `Checklist - ${route.params?.equipmentTag || ''}` 
        })}
      />
      <RoutesStack.Screen
        name="RouteHistory"
        component={RouteHistoryScreen}
        options={{ title: 'Histórico' }}
      />
    </RoutesStack.Navigator>
  );
}

// ============================================================================
// ANOMALIES NAVIGATOR
// ============================================================================

function AnomaliesNavigator() {
  return (
    <AnomaliesStack.Navigator screenOptions={defaultScreenOptions}>
      <AnomaliesStack.Screen
        name="AnomaliesList"
        component={AnomaliesListScreen}
        options={{ title: 'Anomalias' }}
      />
      <AnomaliesStack.Screen
        name="AnomalyDetail"
        component={AnomalyDetailScreen}
        options={{ title: 'Detalhes da Anomalia' }}
      />
      <AnomaliesStack.Screen
        name="AnomalyCreate"
        component={AnomalyCreateScreen}
        options={{ title: 'Registrar Anomalia' }}
      />
    </AnomaliesStack.Navigator>
  );
}

// ============================================================================
// LUBRICATION NAVIGATOR
// ============================================================================

function LubricationNavigator() {
  return (
    <LubricationStack.Navigator screenOptions={defaultScreenOptions}>
      <LubricationStack.Screen
        name="LubricationList"
        component={LubricationListScreen}
        options={{ title: 'Lubrificação' }}
      />
      <LubricationStack.Screen
        name="LubricationPoint"
        component={LubricationPointScreen}
        options={{ title: 'Ponto de Lubrificação' }}
      />
      <LubricationStack.Screen
        name="LubricationExecution"
        component={LubricationExecutionScreen}
        options={{ title: 'Executar Lubrificação' }}
      />
    </LubricationStack.Navigator>
  );
}

// ============================================================================
// MAIN TAB NAVIGATOR
// ============================================================================

function MainNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary[600],
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <MainTab.Screen
        name="RoutesTab"
        component={RoutesNavigator}
        options={{
          title: 'Rotas',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📋</Text>
          ),
        }}
      />
      <MainTab.Screen
        name="AnomaliesTab"
        component={AnomaliesNavigator}
        options={{
          title: 'Anomalias',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⚠️</Text>
          ),
        }}
      />
      <MainTab.Screen
        name="LubricationTab"
        component={LubricationNavigator}
        options={{
          title: 'Lubrificação',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛢️</Text>
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

// ============================================================================
// ROOT NAVIGATOR
// ============================================================================

export function AppNavigator() {
  // TODO: Integrar com sistema de autenticação
  // Por enquanto, sempre mostra Main (para desenvolvimento)
  const isAuthenticated = false; // Mudar para false para testar tela de login

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing[6],
  },
  placeholderTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing[6],
  },
  backButton: {
    marginTop: theme.spacing[4],
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[3],
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.base,
  },
  backButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});