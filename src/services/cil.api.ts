import { supabase } from './supabase';
import type { CILRoute, CILRouteExecution, CILChecklist } from '../types/database.types';

/**
 * API response type
 */
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

/**
 * Fetches all active CIL routes
 */
export async function fetchActiveRoutes(): Promise<ApiResponse<CILRoute[]>> {
  try {
    const { data, error } = await supabase
      .from('cil_routes')
      .select('*')
      .eq('is_active', true)
      .order('route_number', { ascending: true });

    if (error) {
      console.error('Error fetching active routes:', error);
      return { data: null, error: error.message };
    }

    return { data: data as CILRoute[], error: null };
  } catch (error) {
    console.error('Exception fetching active routes:', error);
    return { data: null, error: 'Failed to fetch active routes' };
  }
}

/**
 * Fetches routes by specific date
 */
export async function fetchRoutesByDate(date: string): Promise<ApiResponse<CILRoute[]>> {
  try {
    const { data, error } = await supabase
      .from('cil_routes')
      .select('*')
      .eq('next_execution_date', date)
      .eq('is_active', true)
      .order('route_number', { ascending: true });

    if (error) {
      console.error('Error fetching routes by date:', error);
      return { data: null, error: error.message };
    }

    return { data: data as CILRoute[], error: null };
  } catch (error) {
    console.error('Exception fetching routes by date:', error);
    return { data: null, error: 'Failed to fetch routes by date' };
  }
}