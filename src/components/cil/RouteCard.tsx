import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { formatDate } from '../../utils/Date.utils.ts';
import type { CILRoute } from '../../types/database.types';

/**
 * Props interface for RouteCard component
 */
interface RouteCardProps {
  route: CILRoute;
  equipmentCount?: number;
  onPress: (route: CILRoute) => void;
}

/**
 * Route status type
 */
type RouteStatus = 'pending' | 'overdue' | 'completed';

/**
 * Reusable card component to display CIL route information
 * 
 * Responsibilities:
 * - Display route basic info (name, number, frequency)
 * - Show visual status indicator (pending/overdue/completed)
 * - Display equipment count
 * - Show estimated duration
 * - Handle press navigation
 * 
 * @param {RouteCardProps} props - Component props
 * @returns {React.ReactElement} Rendered card component
 */
export function RouteCard({ route, equipmentCount = 0, onPress }: RouteCardProps): React.ReactElement {
  const status = getRouteStatus(route);
  const statusConfig = getStatusConfig(status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(route)}
      accessibilityRole="button"
      accessibilityLabel={`Rota ${route.route_number}: ${route.name}`}
    >
      {/* Status Indicator */}
      <View style={[styles.statusBar, { backgroundColor: statusConfig.color }]} />

      {/* Card Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.routeNumber}>{route.route_number}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusConfig.backgroundColor }]}>
              <Text style={[styles.statusText, { color: statusConfig.color }]}>
                {statusConfig.label}
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={24} color={theme.colors.text.secondary} />
        </View>

        {/* Route Name */}
        <Text style={styles.routeName} numberOfLines={2}>
          {route.name}
        </Text>

        {/* Route Info */}
        <View style={styles.infoContainer}>
          {/* Equipment Count */}
          <View style={styles.infoItem}>
            <Ionicons name="cube-outline" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.infoText}>
              {equipmentCount} {equipmentCount === 1 ? 'equipamento' : 'equipamentos'}
            </Text>
          </View>

          {/* Duration */}
          {route.estimated_duration_minutes && (
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color={theme.colors.text.secondary} />
              <Text style={styles.infoText}>
                {formatDuration(route.estimated_duration_minutes)}
              </Text>
            </View>
          )}

          {/* Frequency */}
          <View style={styles.infoItem}>
            <Ionicons name="repeat-outline" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.infoText}>
              {formatFrequency(route.frequency_type)}
            </Text>
          </View>
        </View>

        {/* Next Execution Date */}
        {route.next_execution_date && (
          <View style={styles.dateContainer}>
            <Ionicons 
              name={status === 'overdue' ? 'alert-circle' : 'calendar-outline'} 
              size={14} 
              color={status === 'overdue' ? theme.colors.status.nok : theme.colors.text.secondary} 
            />
            <Text style={[
              styles.dateText,
              status === 'overdue' && styles.dateTextOverdue,
            ]}>
              {status === 'overdue' ? 'Atrasada desde ' : 'Próxima execução: '}
              {formatDate(route.next_execution_date)}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

/**
 * Determines route status based on next_execution_date
 * Single Responsibility: only calculates status
 * 
 * @param {CILRoute} route - The route to check
 * @returns {RouteStatus} The route status
 */
function getRouteStatus(route: CILRoute): RouteStatus {
  if (!route.next_execution_date) return 'pending';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const routeDate = new Date(route.next_execution_date);
  routeDate.setHours(0, 0, 0, 0);

  if (routeDate < today) return 'overdue';
  return 'pending';
}

/**
 * Returns visual configuration for each status
 * Single Responsibility: only returns status styling config
 * 
 * @param {RouteStatus} status - The route status
 * @returns {object} Status configuration object
 */
function getStatusConfig(status: RouteStatus) {
  const configs = {
    pending: {
      label: 'Pendente',
      color: theme.colors.status.na,
      backgroundColor: `${theme.colors.status.na}15`,
    },
    overdue: {
      label: 'Atrasada',
      color: theme.colors.status.nok,
      backgroundColor: `${theme.colors.status.nok}15`,
    },
    completed: {
      label: 'Concluída',
      color: theme.colors.status.ok,
      backgroundColor: `${theme.colors.status.ok}15`,
    },
  };

  return configs[status];
}

/**
 * Formats duration in minutes to readable string
 * Single Responsibility: only formats duration
 * 
 * @param {number} minutes - Duration in minutes
 * @returns {string} Formatted duration
 */
function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

/**
 * Formats frequency type to Portuguese label
 * Single Responsibility: only formats frequency
 * 
 * @param {string} frequencyType - Frequency type from database
 * @returns {string} Formatted frequency label
 */
function formatFrequency(frequencyType: string): string {
  const frequencies: Record<string, string> = {
    daily: 'Diária',
    weekly: 'Semanal',
    monthly: 'Mensal',
    quarterly: 'Trimestral',
    yearly: 'Anual',
  };

  return frequencies[frequencyType] || frequencyType;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  statusBar: {
    width: '100%',
    height: 4,
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  routeNumber: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary[600],
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  statusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
  },
  routeName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  dateText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
    color: theme.colors.text.secondary,
  },
  dateTextOverdue: {
    color: theme.colors.status.nok,
    fontWeight: theme.typography.fontWeight.medium,
  },
});