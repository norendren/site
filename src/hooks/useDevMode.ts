/**
 * Development Mode Hook
 *
 * Enables testing utilities for rapid development:
 * - Activate via URL parameter: ?dev=true or ?dev=false
 * - Or via localStorage: localStorage.setItem('devMode', 'true')
 * - Or via keyboard shortcut: Ctrl+Shift+D (Cmd+Shift+D on Mac)
 *
 * When enabled:
 * - Skip form validation
 * - Quick-fill test data
 * - Jump between steps
 */

import { useState, useEffect } from 'react';

export function useDevMode() {
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check URL parameter first (has priority)
    const urlParams = new URLSearchParams(window.location.search);
    const urlDevParam = urlParams.get('dev');

    let initialDevMode = false;

    if (urlDevParam !== null) {
      // URL parameter takes priority if present
      initialDevMode = urlDevParam === 'true';
    } else {
      // Fall back to localStorage if no URL parameter
      initialDevMode = localStorage.getItem('devMode') === 'true';
    }

    setIsDevMode(initialDevMode);

    // Add keyboard shortcut listener
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl+Shift+D (Windows/Linux) or Cmd+Shift+D (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsDevMode(prev => {
          const newValue = !prev;
          localStorage.setItem('devMode', newValue.toString());

          // Update URL to reflect dev mode state
          const url = new URL(window.location.href);
          if (newValue) {
            url.searchParams.set('dev', 'true');
          } else {
            url.searchParams.delete('dev');
          }
          window.history.replaceState({}, '', url.toString());

          return newValue;
        });
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, []);

  const toggleDevMode = () => {
    const newValue = !isDevMode;
    setIsDevMode(newValue);
    localStorage.setItem('devMode', newValue.toString());
  };

  return {
    isDevMode,
    toggleDevMode,
  };
}
