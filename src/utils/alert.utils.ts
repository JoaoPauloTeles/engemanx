import { Alert, Platform } from 'react-native';

/**
 * Shows a success alert with a green checkmark (iOS) or default icon (Android)
 * 
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {() => void} onPress - Optional callback when OK is pressed
 */
export function showSuccessAlert(
  title: string,
  message: string,
  onPress?: () => void
): void {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
        style: 'default',
      },
    ],
    { cancelable: false }
  );
}

/**
 * Shows an error alert with a red X (iOS) or default icon (Android)
 * 
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {() => void} onPress - Optional callback when OK is pressed
 */
export function showErrorAlert(
  title: string,
  message: string,
  onPress?: () => void
): void {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );
}

/**
 * Shows a confirmation dialog with Cancel and Confirm buttons
 * 
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {() => void} onConfirm - Callback when Confirm is pressed
 * @param {() => void} onCancel - Optional callback when Cancel is pressed
 * @param {string} confirmText - Custom text for confirm button (default: "Confirmar")
 * @param {string} cancelText - Custom text for cancel button (default: "Cancelar")
 */
export function showConfirmAlert(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void,
  confirmText: string = 'Confirmar',
  cancelText: string = 'Cancelar'
): void {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: confirmText,
        onPress: onConfirm,
        style: 'default',
      },
    ],
    { cancelable: false }
  );
}

/**
 * Shows a warning alert
 * 
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {() => void} onPress - Optional callback when OK is pressed
 */
export function showWarningAlert(
  title: string,
  message: string,
  onPress?: () => void
): void {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
        style: 'default',
      },
    ],
    { cancelable: true }
  );
}

/**
 * Shows an info alert
 * 
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {() => void} onPress - Optional callback when OK is pressed
 */
export function showInfoAlert(
  title: string,
  message: string,
  onPress?: () => void
): void {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'OK',
        onPress: onPress,
        style: 'default',
      },
    ],
    { cancelable: true }
  );
}