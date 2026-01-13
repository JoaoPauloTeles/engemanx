import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { theme } from '../../theme';
import { useRoutes, type RouteFilter } from '../../hooks/useRoutes';
import { RouteCard } from '../../components/cil/RouteCard';
import type { CILRoute } from '../../types/database.types';
import type { RoutesStackParamList } from '../../types/navigation.types';

type NavigationProp = NativeStackNavigationProp<RoutesStackParamList, 'RoutesList'>;

/**
 * Filter button configuration
 */
interface FilterButton {
  key: RouteFilter;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const FILTER_BUTTONS: FilterButton[] = [
  { key: 'today', label: 'Hoje', icon: 'today' },
  { key: 'overdue', label: 'Atrasadas', icon: 'alert-circle' },
  { key: 'all', label: 'Todas', icon: 'list' },
];

/**
 * Routes List Screen - Main screen for CIL routes
 * 
 * Responsibilities:
 * - Display list of CIL routes
 * - Filter routes (today, overdue, all)
 * - Handle pull-to-refresh
 * - Navigate to route details
 * - Show loading and empty states
 * 
 * @returns {React.ReactElement} Rendered screen component
 */
export function RoutesListScreen(): React.ReactElement {
  const navigation = useNavigation<NavigationProp>();
  const { routes, isLoading, filter, setFilter, refreshRoutes } = useRoutes();

  /**
   * Handles route card press - navigates to details
   * Single Responsibility: only handles navigation
   * 
   * @param {CILRoute} route - Selected route
   */
  const handleRoutePress = useCallback(
    (route: CILRoute) => {
      navigation.navigate('RouteDetails', { routeId: route.id });
    },
    [navigation]
  );

  /**
   * Renders individual route card
   * Single Responsibility: only renders card item
   */
  const renderRouteCard = useCallback(
    ({ item }: { item: CILRoute }) => (
      <RouteCard
        route={item}
        equipmentCount={0} // TODO: Fetch from junction table
        onPress={handleRoutePress}
      />
    ),
    [handleRoutePress]
  );

  /**
   * Renders empty state when no routes found
   * Single Responsibility: only renders empty state
   */
  const renderEmptyState = useCallback(() => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyState}>
        <Ionicons name="clipboard-outline" size={64} color={theme.colors.text.disabled} />
        <Text style={styles.emptyStateTitle}>Nenhuma rota encontrada</Text>
        <Text style={styles.emptyStateDescription}>
          {filter === 'today' && 'Não há rotas programadas para hoje.'}
          {filter === 'overdue' && 'Não há rotas atrasadas.'}
          {filter === 'all' && 'Nenhuma rota cadastrada no sistema.'}
        </Text>
      </View>
    );
  }, [isLoading, filter]);

  /**
   * Renders loading state
   * Single Responsibility: only renders loading indicator
   */
  const renderLoadingState = useCallback(() => {
    if (!isLoading || routes.length > 0) return null;

    return (
      <View style={styles.loadingState}>
        <ActivityIndicator size="large" color={theme.colors.primary[600]} />
        <Text style={styles.loadingText}>Carregando rotas...</Text>
      </View>
    );
  }, [isLoading, routes.length]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rotas CIL</Text>
        <Text style={styles.headerSubtitle}>
          {routes.length} {routes.length === 1 ? 'rota' : 'rotas'}
        </Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {FILTER_BUTTONS.map((button) => (
          <FilterButtonComponent
            key={button.key}
            button={button}
            isActive={filter === button.key}
            onPress={() => setFilter(button.key)}
          />
        ))}
      </View>

      {/* Routes List */}
      <FlatList
        data={routes}
        renderItem={renderRouteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshRoutes}
            colors={[theme.colors.primary[600]]}
            tintColor={theme.colors.primary[600]}
          />
        }
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={renderLoadingState}
      />
    </SafeAreaView>
  );
}

/**
 * Filter Button Component
 * Single Responsibility: only renders filter button
 * 
 * @param {object} props - Component props
 * @returns {React.ReactElement} Rendered button
 */
interface FilterButtonProps {
  button: FilterButton;
  isActive: boolean;
  onPress: () => void;
}

function FilterButtonComponent({ button, isActive, onPress }: FilterButtonProps): React.ReactElement {
  return (
    <Pressable
      style={[
        styles.filterButton,
        isActive && styles.filterButtonActive,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Filtrar por: ${button.label}`}
    >
      <Ionicons
        name={button.icon}
        size={18}
        color={isActive ? theme.colors.primary[600] : theme.colors.text.secondary}
      />
      <Text
        style={[
          styles.filterButtonText,
          isActive && styles.filterButtonTextActive,
        ]}
      >
        {button.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.card,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  filterButtonActive: {
    backgroundColor: `${theme.colors.primary[600]}10`,
    borderColor: theme.colors.primary[600],
  },
  filterButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  filterButtonTextActive: {
    color: theme.colors.primary[600],
  },
  listContent: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing['2xl'],
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  emptyStateDescription: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingState: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  loadingText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
  },
});