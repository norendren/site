/**
 * Development Mode Hook
 *
 * Enables testing utilities for rapid development:
 * - Activate via URL parameter: ?dev=true
 * - Or via localStorage: localStorage.setItem('devMode', 'true')
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
    // Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlDevMode = urlParams.get('dev') === 'true';

    // Check localStorage
    const localDevMode = localStorage.getItem('devMode') === 'true';

    setIsDevMode(urlDevMode || localDevMode);
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
