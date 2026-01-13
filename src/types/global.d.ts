/**
 * Global Type Declarations
 * 
 * This file contains global type declarations for TypeScript
 */

// Declare window for web compatibility (React Native doesn't have window by default)
declare global {
  interface Window {
    location: {
      href: string;
      reload: () => void;
    };
  }
}

export {};