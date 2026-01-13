import { useState, useEffect, useCallback } from 'react';
import { fetchActiveRoutes, fetchRoutesByDate } from '../services/cil.api';
import { getCurrentDateISO } from '../utils/date.utils';
import { showErrorAlert } from '../utils/alert.utils';
import type { CILRoute } from '../types/database.types';

/**
 * Filter types for routes list
 */
export type RouteFilter = 'today' | 'overdue' | 'all';

/**
 * Hook state interface
 */
interface UseRoutesState {
  routes: CILRoute[];
  isLoading: boolean;
  error: string | null;
  filter: RouteFilter;
}

/**
 * Hook return interface
 */
interface UseRoutesReturn extends UseRoutesState {
  setFilter: (filter: RouteFilter) => void;
  refreshRoutes: () => Promise<void>;
}

/**
 * Custom hook to manage CIL routes state and operations
 * 
 * Responsibilities:
 * - Fetch routes based on selected filter
 * - Manage loading and error states
 * - Handle pull-to-refresh
 * - Filter routes by date criteria
 * 
 * @returns {UseRoutesReturn} Routes state and operations
 */
export function useRoutes(): UseRoutesReturn {
  const [state, setState] = useState<UseRoutesState>({
    routes: [],
    isLoading: true,
    error: null,
    filter: 'today',
  });

  /**
   * Fetches routes based on current filter
   * Single Responsibility: only fetches and updates state
   */
  const fetchRoutes = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      let routes: CILRoute[] = [];

      switch (state.filter) {
        case 'today':
          routes = await fetchTodayRoutes();
          break;

        case 'overdue':
          routes = await fetchOverdueRoutes();
          break;

        case 'all':
          routes = await fetchAllActiveRoutes();
          break;

        default:
          routes = [];
      }

      setState(prev => ({
        ...prev,
        routes,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = 'Erro ao carregar rotas. Tente novamente.';
      console.error('Error fetching routes:', error);
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));

      showErrorAlert('Erro', errorMessage);
    }
  }, [state.filter]);

  /**
   * Changes the current filter and triggers refetch
   * 
   * @param {RouteFilter} newFilter - The filter to apply
   */
  const setFilter = useCallback((newFilter: RouteFilter) => {
    setState(prev => ({ ...prev, filter: newFilter }));
  }, []);

  /**
   * Refreshes routes list (for pull-to-refresh)
   * 
   * @returns {Promise<void>}
   */
  const refreshRoutes = useCallback(async () => {
    await fetchRoutes();
  }, [fetchRoutes]);

  // Fetch routes when filter changes
  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  return {
    routes: state.routes,
    isLoading: state.isLoading,
    error: state.error,
    filter: state.filter,
    setFilter,
    refreshRoutes,
  };
}

/**
 * Fetches routes scheduled for today
 * Single Responsibility: only fetches today's routes
 * 
 * @returns {Promise<CILRoute[]>} Routes for today
 */
async function fetchTodayRoutes(): Promise<CILRoute[]> {
  const today = getCurrentDateISO();
  const { data, error } = await fetchRoutesByDate(today);

  if (error) {
    console.error('Error fetching today routes:', error);
    throw new Error(error);
  }

  return data || [];
}

/**
 * Fetches overdue routes (next_execution_date < today)
 * Single Responsibility: only fetches overdue routes
 * 
 * @returns {Promise<CILRoute[]>} Overdue routes
 */
async function fetchOverdueRoutes(): Promise<CILRoute[]> {
  const { data, error } = await fetchActiveRoutes();

  if (error) {
    console.error('Error fetching overdue routes:', error);
    throw new Error(error);
  }

  if (!data) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return data.filter(route => {
    if (!route.next_execution_date) return false;

    const routeDate = new Date(route.next_execution_date);
    routeDate.setHours(0, 0, 0, 0);

    return routeDate < today;
  });
}

/**
 * Fetches all active routes
 * Single Responsibility: only fetches all active routes
 * 
 * @returns {Promise<CILRoute[]>} All active routes
 */
async function fetchAllActiveRoutes(): Promise<CILRoute[]> {
  const { data, error } = await fetchActiveRoutes();

  if (error) {
    console.error('Error fetching all routes:', error);
    throw new Error(error);
  }

  return data || [];
}