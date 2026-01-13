import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formats a date string or Date object to Brazilian format
 * 
 * @param {string | Date} date - Date to format
 * @param {string} formatStr - Format string (default: 'dd/MM/yyyy')
 * @returns {string} Formatted date
 */
export function formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: ptBR });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

/**
 * Gets current date in ISO format (YYYY-MM-DD)
 * 
 * @returns {string} Current date in ISO format
 */
export function getCurrentDateISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Formats a date to relative time (e.g., "2 dias atrás")
 * 
 * @param {string | Date} date - Date to format
 * @returns {string} Relative time string
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Hoje';
  if (diffInDays === 1) return 'Ontem';
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`;
  return `${Math.floor(diffInDays / 365)} anos atrás`;
}

/**
 * Formats time to HH:mm format
 * 
 * @param {string | Date} date - Date/time to format
 * @returns {string} Formatted time
 */
export function formatTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '';
  }
}

/**
 * Formats date with time to Brazilian format
 * 
 * @param {string | Date} date - Date to format
 * @returns {string} Formatted date and time
 */
export function formatDateTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return '';
  }
}