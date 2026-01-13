/**
 * Alert Helper
 * 
 * Clean Code:
 * - Cross-Platform: Funciona em web, iOS e Android
 * - Single Responsibility: Apenas mostra alertas
 * - Fallback: Web usa window.alert quando Alert.alert não disponível
 * 
 * Arquivo: src/utils/alert.utils.ts
 */

import { Alert, Platform } from 'react-native';

// ============================================================================
// TYPES
// ============================================================================

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

// ============================================================================
// CROSS-PLATFORM ALERT
// ============================================================================

/**
 * Mostra alerta que funciona em todas as plataformas
 * 
 * Web: Usa window.alert + window.confirm
 * iOS/Android: Usa Alert.alert nativo
 */
export function showAlert(
  title: string,
  message: string,
  buttons: AlertButton[] = [{ text: 'OK' }],
  options?: { cancelable?: boolean }
): void {
  if (Platform.OS === 'web') {
    showWebAlert(title, message, buttons);
  } else {
    Alert.alert(title, message, buttons, options);
  }
}

/**
 * Implementação para web usando window.alert
 */
function showWebAlert(
  title: string,
  message: string,
  buttons: AlertButton[]
): void {
  const fullMessage = `${title}\n\n${message}`;
  
  if (buttons.length === 1) {
    // Single button - usa window.alert
    window.alert(fullMessage);
    buttons[0].onPress?.();
  } else {
    // Multiple buttons - usa window.confirm
    const confirmed = window.confirm(fullMessage);
    
    if (confirmed) {
      // Primeiro botão (geralmente OK/Confirmar)
      buttons[0].onPress?.();
    } else if (buttons.length > 1) {
      // Segundo botão (geralmente Cancelar)
      buttons[1].onPress?.();
    }
  }
}

/**
 * Alerta de sucesso
 */
export function showSuccessAlert(
  title: string,
  message: string,
  onOk?: () => void
): void {
  showAlert(title, message, [
    {
      text: 'OK',
      onPress: onOk,
      style: 'default',
    },
  ]);
}

/**
 * Alerta de erro
 */
export function showErrorAlert(
  title: string,
  message: string,
  onOk?: () => void
): void {
  showAlert(title, message, [
    {
      text: 'OK',
      onPress: onOk,
      style: 'default',
    },
  ]);
}

/**
 * Alerta de confirmação (Sim/Não)
 */
export function showConfirmAlert(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): void {
  showAlert(
    title,
    message,
    [
      {
        text: 'Sim',
        onPress: onConfirm,
        style: 'default',
      },
      {
        text: 'Não',
        onPress: onCancel,
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );
}