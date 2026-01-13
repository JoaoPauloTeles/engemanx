/**
 * Navigation Type Definitions
 * Type-safe navigation usando React Navigation
 * 
 * Clean Code: Strong typing previne erros de navegação em compile time
 * 
 * Arquivo: src/types/navigation.types.ts
 */

import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

// ============================================================================
// AUTH STACK
// ============================================================================

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  StackScreenProps<AuthStackParamList, T>;

// ============================================================================
// ROUTES STACK (CIL Routes)
// ============================================================================

export type RoutesStackParamList = {
  RoutesList: undefined;
  RouteDetails: {
    routeId: string;
  };
  RouteExecution: {
    executionId: string;
    routeId: string;
  };
  ChecklistExecution: {
    executionId: string;
    checklistExecutionId: string;
    equipmentId: string;
    equipmentTag: string;
  };
  ItemDetail: {
    checklistExecutionId: string;
    itemId: string;
    itemNumber: string;
  };
  RouteHistory: {
    routeId: string;
  };
};

export type RoutesStackScreenProps<T extends keyof RoutesStackParamList> =
  CompositeScreenProps<
    StackScreenProps<RoutesStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// ============================================================================
// ANOMALIES STACK
// ============================================================================

export type AnomaliesStackParamList = {
  AnomaliesList: undefined;
  AnomalyDetail: {
    anomalyId: string;
  };
  AnomalyCreate: {
    checklistExecutionId?: string;
    equipmentId: string;
    equipmentTag: string;
  };
  AnomalyPhotos: {
    anomalyId: string;
  };
};

export type AnomaliesStackScreenProps<T extends keyof AnomaliesStackParamList> =
  CompositeScreenProps<
    StackScreenProps<AnomaliesStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// ============================================================================
// LUBRICATION STACK
// ============================================================================

export type LubricationStackParamList = {
  LubricationList: undefined;
  LubricationPoint: {
    pointId: string;
    equipmentId: string;
  };
  LubricationExecution: {
    pointId: string;
    equipmentTag: string;
  };
  LubricationHistory: {
    pointId: string;
  };
};

export type LubricationStackScreenProps<T extends keyof LubricationStackParamList> =
  CompositeScreenProps<
    StackScreenProps<LubricationStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// ============================================================================
// MAIN TAB NAVIGATION
// ============================================================================

export type MainTabParamList = {
  RoutesTab: NavigatorScreenParams<RoutesStackParamList>;
  AnomaliesTab: NavigatorScreenParams<AnomaliesStackParamList>;
  LubricationTab: NavigatorScreenParams<LubricationStackParamList>;
  ProfileTab: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// ============================================================================
// ROOT NAVIGATOR
// ============================================================================

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Modal screens (full screen modals)
  Camera: {
    onCapture: (uri: string) => void;
  };
  PhotoViewer: {
    uri: string;
    title?: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

// ============================================================================
// GLOBAL NAVIGATION DECLARATION
// ============================================================================

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}